import { Suspense } from "react";
import { Metadata } from "next";
import { getAllPosts } from "@/lib/queries/posts";
import { PostCard } from "@/components/blog/post-card";
import { LoadingGrid } from "@/components/blog/loading-grid";

export const dynamic = "force-dynamic";
import { BlogHeader } from "@/components/blog/blog-header";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos sobre desarrollo web, React, Next.js, TypeScript y más.",
};

export default async function BlogPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20" />
      </div>

      {/* Decorative orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto max-w-6xl px-4 py-12 relative space-y-20">
        {/* Header Section */}
        <div className="relative">
          <BlogHeader />
        </div>

        {/* Posts Grid */}
        <Suspense fallback={<LoadingGrid />}>
          <PostsGrid />
        </Suspense>
      </div>
    </div>
  );
}

async function PostsGrid() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">📝</div>
          <p className="text-xl text-white font-semibold">
            No hay posts publicados aún.
          </p>
          <p className="text-sm text-gray-400">
            Mantente atento para nuevas publicaciones próximamente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post: typeof posts[0]) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}