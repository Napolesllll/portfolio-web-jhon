import { Suspense } from "react";
import { Metadata } from "next";
import { getAllPosts } from "@/lib/queries/posts";
import { PostCard } from "@/components/blog/post-card";
import { LoadingGrid } from "@/components/blog/loading-grid";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos sobre desarrollo web, React, Next.js, TypeScript y más.",
};

export default async function BlogPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-display text-4xl font-bold sm:text-5xl">
          Blog
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-foreground-secondary">
          Artículos sobre desarrollo web, mejores prácticas y tecnologías
          modernas.
        </p>
      </div>

      {/* Posts Grid */}
      <Suspense fallback={<LoadingGrid />}>
        <PostsGrid />
      </Suspense>
    </div>
  );
}

async function PostsGrid() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-foreground-secondary">
            No hay posts publicados aún.
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