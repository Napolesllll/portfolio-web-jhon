"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth/auth";
import { generateSlug } from "@/lib/utils";

export async function createProject(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("No autorizado");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const coverImage = formData.get("coverImage") as string;
  const stackString = formData.get("stack") as string;
  const liveUrl = (formData.get("liveUrl") as string) || null;
  const githubUrl = (formData.get("githubUrl") as string) || null;
  const featured = formData.get("featured") === "true";
  const status = formData.get("status") as "IN_PROGRESS" | "COMPLETED" | "ARCHIVED";
  const metricsString = formData.get("metrics") as string;

  const slug = generateSlug(title);
  const stack = stackString ? stackString.split(",").map((s) => s.trim()) : [];

  let metrics = null;
  if (metricsString) {
    try {
      metrics = JSON.parse(metricsString);
    } catch (e) {
      console.error("Error parsing metrics:", e);
    }
  }

  await prisma.project.create({
    data: {
      title,
      slug,
      description,
      content,
      coverImage,
      stack,
      liveUrl,
      githubUrl,
      featured,
      status,
      metrics,
    },
  });

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(projectId: string, formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("No autorizado");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const coverImage = formData.get("coverImage") as string;
  const stackString = formData.get("stack") as string;
  const liveUrl = (formData.get("liveUrl") as string) || null;
  const githubUrl = (formData.get("githubUrl") as string) || null;
  const featured = formData.get("featured") === "true";
  const status = formData.get("status") as "IN_PROGRESS" | "COMPLETED" | "ARCHIVED";
  const metricsString = formData.get("metrics") as string;

  const slug = generateSlug(title);
  const stack = stackString ? stackString.split(",").map((s) => s.trim()) : [];

  let metrics = null;
  if (metricsString) {
    try {
      metrics = JSON.parse(metricsString);
    } catch (e) {
      console.error("Error parsing metrics:", e);
    }
  }

  await prisma.project.update({
    where: { id: projectId },
    data: {
      title,
      slug,
      description,
      content,
      coverImage,
      stack,
      liveUrl,
      githubUrl,
      featured,
      status,
      metrics,
    },
  });

  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(projectId: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("No autorizado");
  }

  await prisma.project.delete({
    where: { id: projectId },
  });

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}