import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { FileText, Eye, Tag, FolderOpen } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 font-display text-3xl font-bold">Dashboard</h1>
        <p className="text-foreground-secondary">
          Vista general de tu contenido
        </p>
      </div>

      <Suspense fallback={<StatsLoading />}>
        <Stats />
      </Suspense>

      <Suspense fallback={<div>Cargando posts recientes...</div>}>
        <RecentPosts />
      </Suspense>
    </div>
  );
}

async function Stats() {
  const [totalPosts, publishedPosts, postViews, projectViews, totalCategories, totalTags] =
    await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { published: true } }),
      prisma.post.aggregate({ _sum: { views: true } }),
      prisma.project.aggregate({ _sum: { views: true } }),
      prisma.category.count(),
      prisma.tag.count(),
    ]);

  const totalViews = (postViews._sum.views || 0) + (projectViews._sum.views || 0);

  const stats = [
    {
      name: "Total Posts",
      value: totalPosts,
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      name: "Publicados",
      value: publishedPosts,
      icon: FileText,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      name: "Total Vistas",
      value: formatNumber(totalViews),
      icon: Eye,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      name: "Categorías",
      value: totalCategories,
      icon: FolderOpen,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      name: "Tags",
      value: totalTags,
      icon: Tag,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
  ];

  return (
    <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="rounded-xl border border-border bg-background-secondary p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-secondary">{stat.name}</p>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            </div>
            <div className={`rounded-lg p-3 ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function RecentPosts() {
  type Post = {
    id: string;
    title: string;
    createdAt: Date;
    published: boolean;
    views: number;
    category: { name: string };
    author: { name: string | null };
  };

  const posts: Post[] = await prisma.post.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      author: { select: { name: true } },
    },
  });

  return (
    <div className="rounded-xl border border-border bg-background-secondary">
      <div className="border-b border-border p-6">
        <h2 className="font-display text-xl font-bold">Posts Recientes</h2>
      </div>
      <div className="divide-y divide-border">
        {posts.map((post) => (
          <div key={post.id} className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-medium">{post.title}</h3>
              <p className="mt-1 text-sm text-foreground-secondary">
                {post.author.name} • {post.category.name}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-foreground-tertiary">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${post.published
                    ? "bg-green-500/10 text-green-500"
                    : "bg-yellow-500/10 text-yellow-500"
                  }`}
              >
                {post.published ? "Publicado" : "Borrador"}
              </span>
              <span>{formatNumber(post.views)} vistas</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsLoading() {
  return (
    <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-32 animate-pulse rounded-xl bg-background-secondary"
        />
      ))}
    </div>
  );
}