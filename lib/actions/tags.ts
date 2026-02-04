"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth/auth";
import { generateSlug } from "@/lib/utils";

export async function createTag(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { success: false, error: "No autorizado" };
  }

  const name = formData.get("name") as string;
  const slug = generateSlug(name);

  try {
    await prisma.tag.create({
      data: {
        name,
        slug,
      },
    });

    revalidatePath("/admin/tags");
    return { success: true };
  } catch (error) {
    console.error("Error creating tag:", error);
    return { success: false, error: "Error al crear tag" };
  }
}

export async function deleteTag(tagId: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { success: false, error: "No autorizado" };
  }

  try {
    await prisma.tag.delete({
      where: { id: tagId },
    });

    revalidatePath("/admin/tags");
    return { success: true };
  } catch (error) {
    console.error("Error deleting tag:", error);
    return { success: false, error: "Error al eliminar tag" };
  }
}