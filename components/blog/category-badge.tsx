"use client";

import Link from "next/link";

type CategoryBadgeProps = {
  category: {
    name: string;
    slug: string;
    color: string;
  };
  clickable?: boolean;
};

export function CategoryBadge({ category, clickable = true }: CategoryBadgeProps) {
  const badge = (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition-smooth hover:scale-105"
      style={{ backgroundColor: category.color }}
    >
      {category.name}
    </span>
  );

  if (!clickable) return badge;

  return (
    <Link href={`/blog/category/${category.slug}`} onClick={(e) => e.stopPropagation()}>
      {badge}
    </Link>
  );
}