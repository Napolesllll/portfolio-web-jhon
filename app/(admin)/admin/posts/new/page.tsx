import { prisma } from "@/lib/prisma";
import { PostForm } from "@/components/admin/post-form";

export default async function NewPostPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const tags = await prisma.tag.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 font-display text-3xl font-bold">Nuevo Post</h1>
        <p className="text-foreground-secondary">
          Crea un nuevo artículo para tu blog
        </p>
      </div>

      <PostForm categories={categories} tags={tags} />
    </div>
  );
}