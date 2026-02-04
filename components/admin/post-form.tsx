"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TiptapEditor } from "./tiptap-editor";
import { PublishWithConfetti } from "./confetti-button";
import { createPost, updatePost } from "@/lib/actions/posts";
import Link from "next/link";

type PostFormProps = {
  post?: {
    id: string;
    title: string;
    excerpt: string | null;
    content: string;
    coverImage: string | null;
    published: boolean;
    categoryId: string;
  };
  categories: Array<{ id: string; name: string }>;
  tags: Array<{ id: string; name: string }>;
};

export function PostForm({ post, categories, tags }: PostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [content, setContent] = useState(post?.content || "");
  const [coverImageUrl, setCoverImageUrl] = useState(post?.coverImage || "");
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  const isEditing = !!post;

  async function handleSubmit(formData: FormData) {
    formData.set("content", content);
    formData.set("coverImage", coverImageUrl);

    startTransition(async () => {
      if (isEditing) {
        await updatePost(post.id, formData);
      } else {
        await createPost(formData);
      }
    });
  }

  async function handleCoverImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCover(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al subir imagen");

      const data = await response.json();
      setCoverImageUrl(data.url);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al subir la imagen de portada");
    } finally {
      setIsUploadingCover(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      {/* Header con botones */}
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" type="button">
          <Link href="/admin/posts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>

        <div className="flex gap-2">
          <Button
            type="submit"
            name="published"
            value="false"
            variant="secondary"
            disabled={isPending}
          >
            <Save className="mr-2 h-4 w-4" />
            Guardar Borrador
          </Button>
          <PublishWithConfetti disabled={isPending} />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Contenido principal */}
        <div className="space-y-6 lg:col-span-2">
          {/* Título */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Título *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={post?.title}
              disabled={isPending}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-2xl font-bold text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
              placeholder="Título del post"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label
              htmlFor="excerpt"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Resumen
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={3}
              defaultValue={post?.excerpt || ""}
              disabled={isPending}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
              placeholder="Breve descripción del artículo..."
            />
          </div>

          {/* Editor */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Contenido *
            </label>
            <TiptapEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Imagen de portada */}
          <div className="rounded-lg border border-border bg-background-secondary p-6">
            <h3 className="mb-4 font-semibold">Imagen de portada</h3>

            {coverImageUrl && (
              <div className="mb-4">
                <img
                  src={coverImageUrl}
                  alt="Cover preview"
                  className="w-full rounded-lg"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleCoverImageUpload}
              disabled={isUploadingCover || isPending}
              className="w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
            />

            {isUploadingCover && (
              <p className="mt-2 text-sm text-foreground-secondary">
                Subiendo...
              </p>
            )}
          </div>

          {/* Categoría */}
          <div className="rounded-lg border border-border bg-background-secondary p-6">
            <label
              htmlFor="categoryId"
              className="mb-4 block font-semibold"
            >
              Categoría *
            </label>
            <select
              id="categoryId"
              name="categoryId"
              required
              defaultValue={post?.categoryId}
              disabled={isPending}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags (simple por ahora) */}
          <div className="rounded-lg border border-border bg-background-secondary p-6">
            <h3 className="mb-4 font-semibold">Tags</h3>
            <p className="text-sm text-foreground-secondary">
              La gestión de tags se agregará en la próxima actualización
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}