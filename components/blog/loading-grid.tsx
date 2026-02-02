export function LoadingGrid() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-border bg-background-secondary"
        >
          {/* Image skeleton */}
          <div className="aspect-video animate-pulse bg-background-tertiary" />

          {/* Content skeleton */}
          <div className="p-6">
            <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-background-tertiary" />
            <div className="mb-4 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-background-tertiary" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-background-tertiary" />
            </div>
            <div className="flex gap-4">
              <div className="h-3 w-20 animate-pulse rounded bg-background-tertiary" />
              <div className="h-3 w-16 animate-pulse rounded bg-background-tertiary" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}