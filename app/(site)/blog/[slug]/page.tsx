import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPostBySlugCached, getRelatedPosts, incrementPostViews } from "@/lib/queries/posts";
import { getReactionCounts } from "@/lib/actions/reactions";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/structured-data";
import { BlogPostHero } from "@/components/blog/blog-post-hero";
import { BlogContentWrapper } from "@/components/blog/blog-content-wrapper";
import { BlogPostTags } from "@/components/blog/blog-post-tags";
import { BlogRelatedPosts } from "@/components/blog/blog-related-posts";
import { PostReactions } from "@/components/blog/post-reactions";
import { ReadingProgress } from "@/components/blog/reading-progress";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generar metadata dinámica
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlugCached(slug);

  if (!post) {
    return {
      title: "Post no encontrado",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: post.author.name ? [post.author.name] : undefined,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlugCached(slug);

  type Post = NonNullable<typeof post>;

  if (!post || !post.published) {
    notFound();
  }

  // Incrementar vistas (no bloqueante)
  incrementPostViews(slug);

  // Obtener conteos de reacciones
  const reactionCounts = await getReactionCounts(post.id);

  // Obtener posts relacionados
  const relatedPosts = await getRelatedPosts(post.id, post.categoryId);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    image: post.coverImage || "",
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.author.name || "Jhon Cano",
      url: "https://jhoncano.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Jhon Cano",
      logo: {
        "@type": "ImageObject",
        url: "https://jhoncano.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://jhoncano.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <ReadingProgress />

      {/* Header Section with Hero */}
      <div className="relative overflow-hidden mb-20">
        {/* Background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950" />

        {/* Main Container */}
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="ghost" size="sm" className="group">
              <Link href="/blog" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Volver al blog
              </Link>
            </Button>
          </div>

          {/* Hero Section */}
          <BlogPostHero
            title={post.title}
            excerpt={post.excerpt}
            coverImage={post.coverImage}
            category={post.category}
            author={post.author}
            publishedAt={post.publishedAt}
            readingTime={post.readingTime}
            views={post.views}
          />
        </div>
      </div>

      {/* Cover Image - Full Width */}
      {post.coverImage && (
        <div className="relative h-96 sm:h-[500px] overflow-hidden mb-20 -mx-4 sm:mx-0 sm:rounded-2xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
        </div>
      )}

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 pb-20">
        {/* Content */}
        <BlogContentWrapper>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </BlogContentWrapper>

        {/* Tags */}
        <BlogPostTags tags={post.tags} />

        {/* Reactions */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6">
            ¿Qué te pareció este artículo?
          </h3>
          <PostReactions postId={post.id} initialCounts={reactionCounts} />
        </div>

        {/* Related Posts */}
        <BlogRelatedPosts posts={relatedPosts} />
      </article>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.querySelectorAll('pre').forEach((pre) => {
            pre.classList.add('group', 'relative');
          });
        `,
        }}
      />
    </>
  );
}