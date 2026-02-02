import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Eye, ArrowLeft } from "lucide-react";
import { getPostBySlug, getRelatedPosts, incrementPostViews } from "@/lib/queries/posts";
import { formatDate, formatNumber } from "@/lib/utils";
import { CategoryBadge } from "@/components/blog/category-badge";
import { TagBadge } from "@/components/blog/tag-badge";
import { PostCard } from "@/components/blog/post-card";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generar metadata dinámica
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

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
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  // Incrementar vistas (no bloqueante)
  incrementPostViews(slug);

  // Obtener posts relacionados
  const relatedPosts = await getRelatedPosts(post.id, post.categoryId);

  return (
    <article className="container mx-auto max-w-4xl px-4 py-12">
      {/* Back button */}
      <Button asChild variant="ghost" size="sm" className="mb-8">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al blog
        </Link>
      </Button>

      {/* Header */}
      <header className="mb-8">
        <div className="mb-4">
          <CategoryBadge category={post.category} />
        </div>

        <h1 className="mb-4 font-display text-4xl font-bold sm:text-5xl">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mb-6 text-xl text-foreground-secondary">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-foreground-tertiary">
          {post.author.name && (
            <div className="flex items-center gap-2">
              {post.author.image && (
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="font-medium text-foreground">
                {post.author.name}
              </span>
            </div>
          )}
          {post.publishedAt && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime} min de lectura</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{formatNumber(post.views)} vistas</span>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative mb-12 aspect-video overflow-hidden rounded-xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-neutral dark:prose-invert max-w-none
          prose-headings:font-display prose-headings:font-bold
          prose-h2:mt-12 prose-h2:text-3xl
          prose-h3:mt-8 prose-h3:text-2xl
          prose-p:text-foreground-secondary
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground
          prose-code:rounded prose-code:bg-background-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-normal prose-code:text-primary
          prose-pre:bg-background-secondary prose-pre:border prose-pre:border-border
          prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mt-12 border-t border-border pt-8">
          <h3 className="mb-4 text-sm font-semibold text-foreground-secondary">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
          </div>
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16 border-t border-border pt-12">
          <h2 className="mb-8 font-display text-2xl font-bold">
            Artículos relacionados
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}