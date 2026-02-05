import Link from "next/link";
import { Suspense } from "react";
import { Plus, Pencil, Trash2, Eye, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";
import { formatDate, formatNumber } from "@/lib/utils";
import { DeletePostButton } from "@/components/admin/delete-post-button";

export default function AdminPostsPage() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 font-display text-3xl font-bold">Posts</h1>
          <p className="text-foreground-secondary">
            Gestiona tus artículos del blog
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Post
          </Link>
        </Button>
      </div>

      <Suspense fallback={<PostsLoading />}>
        <PostsList />
      </Suspense>
    </div>
  );
}

async function PostsList() {
  type Post = {
    id: string;
    title: string;
    excerpt: string | null;
    createdAt: Date;
    published: boolean;
    views: number;
    category: { name: string; color: string };
    author: { name: string | null };
    _count: { reactions: number };
  };

  const posts: Post[] = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      author: { select: { name: true } },
      _count: { select: { reactions: true } },
    },
  });

  if (posts.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-border bg-background-secondary">
        <div className="text-center">
          <FileText className="mx-auto mb-4 h-12 w-12 text-foreground-tertiary" />
          <h3 className="mb-2 text-lg font-semibold">No hay posts</h3>
          <p className="mb-4 text-sm text-foreground-secondary">
            Comienza creando tu primer artículo
          </p>
          <Button asChild>
            <Link href="/admin/posts/new">
              <Plus className="mr-2 h-4 w-4" />
              Crear Post
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background-secondary">
      <table className="w-full">
        <thead className="border-b border-border bg-background-tertiary">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Título
            </th>
            <th className="hidden px-6 py-4 text-left text-sm font-semibold lg:table-cell">
              Categoría
            </th>
            <th className="hidden px-6 py-4 text-left text-sm font-semibold md:table-cell">
              Estado
            </th>
            <th className="hidden px-6 py-4 text-left text-sm font-semibold xl:table-cell">
              Vistas
            </th>
            <th className="hidden px-6 py-4 text-left text-sm font-semibold xl:table-cell">
              Fecha
            </th>
            <th className="px-6 py-4 text-right text-sm font-semibold">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-background-tertiary">
              <td className="px-6 py-4">
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="mt-1 text-sm text-foreground-tertiary line-clamp-1">
                    {post.excerpt}
                  </p>
                </div>
              </td>
              <td className="hidden px-6 py-4 lg:table-cell">
                <span
                  className="inline-flex rounded-full px-2 py-1 text-xs font-medium text-white"
                  style={{ backgroundColor: post.category.color }}
                >
                  {post.category.name}
                </span>
              </td>
              <td className="hidden px-6 py-4 md:table-cell">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${post.published
                    ? "bg-green-500/10 text-green-500"
                    : "bg-yellow-500/10 text-yellow-500"
                    }`}
                >
                  {post.published ? "Publicado" : "Borrador"}
                </span>
              </td>
              <td className="hidden px-6 py-4 text-sm text-foreground-secondary xl:table-cell">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {formatNumber(post.views)}
                </div>
              </td>
              <td className="hidden px-6 py-4 text-sm text-foreground-secondary xl:table-cell">
                {formatDate(post.createdAt)}
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/posts/edit/${post.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeletePostButton postId={post.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PostsLoading() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background-secondary">
      <div className="divide-y divide-border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between p-6">
            <div className="flex-1 space-y-2">
              <div className="h-5 w-2/3 animate-pulse rounded bg-background-tertiary" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-background-tertiary" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-8 animate-pulse rounded bg-background-tertiary" />
              <div className="h-8 w-8 animate-pulse rounded bg-background-tertiary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}