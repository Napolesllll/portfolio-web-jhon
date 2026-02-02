"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth/auth";
import { generateSlug, calculateReadingTime } from "@/lib/utils";

export async function createPost(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("No autorizado");
  }

  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const categoryId = formData.get("categoryId") as string;
  const coverImage = formData.get("coverImage") as string;
  const published = formData.get("published") === "true";

  const slug = generateSlug(title);
  const readingTime = calculateReadingTime(content);

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      coverImage: coverImage || null,
      published,
      publishedAt: published ? new Date() : null,
      readingTime,
      authorId: session.user.id,
      categoryId,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function updatePost(postId: string, formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("No autorizado");
  }

  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const categoryId = formData.get("categoryId") as string;
  const coverImage = formData.get("coverImage") as string;
  const published = formData.get("published") === "true";

  const slug = generateSlug(title);
  const readingTime = calculateReadingTime(content);

  // Si se está publicando por primera vez, actualizar publishedAt
  const existingPost = await prisma.post.findUnique({
    where: { id: postId },
    select: { published: true },
  });

  await prisma.post.update({
    where: { id: postId },
    data: {
      title,
      slug,
      excerpt,
      content,
      coverImage: coverImage || null,
      published,
      publishedAt:
        published && !existingPost?.published ? new Date() : undefined,
      readingTime,
      categoryId,
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePost(postId: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("No autorizado");
  }

  await prisma.post.delete({
    where: { id: postId },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/posts");
}