"use client";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Eye } from "lucide-react";
import { formatDate, formatNumber } from "@/lib/utils";
import { CategoryBadge } from "./category-badge";

type PostCardProps = {
  post: {
    slug: string;
    title: string;
    excerpt: string | null;
    coverImage: string | null;
    publishedAt: Date | null;
    readingTime: number;
    views: number;
    category: {
      name: string;
      slug: string;
      color: string;
    };
    author: {
      name: string | null;
      image: string | null;
    };
  };
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-xl border border-border bg-background-secondary transition-smooth hover:border-primary/50 hover:shadow-lg"
    >
      {/* Cover Image */}
      <div className="relative aspect-video overflow-hidden bg-background-tertiary">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-smooth group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-6xl opacity-20">📝</span>
          </div>
        )}
        <div className="absolute left-4 top-4">
          <CategoryBadge category={post.category} clickable={false} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold line-clamp-2 group-hover:text-primary transition-smooth">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mb-4 text-sm text-foreground-secondary line-clamp-2">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-tertiary">
          {post.publishedAt && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{post.readingTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            <span>{formatNumber(post.views)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}