import Link from "next/link";

type TagBadgeProps = {
  tag: {
    name: string;
    slug: string;
  };
};

export function TagBadge({ tag }: TagBadgeProps) {
  return (
    <Link
      href={`/blog/tag/${tag.slug}`}
      className="inline-flex items-center rounded-lg border border-border bg-background-secondary px-3 py-1 text-xs font-medium text-foreground-secondary transition-smooth hover:border-primary hover:text-primary"
    >
      #{tag.name}
    </Link>
  );
}