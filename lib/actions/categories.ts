"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth/auth";
import { generateSlug } from "@/lib/utils";

export async function createCategory(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { success: false, error: "No autorizado" };
  }

  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || null;
  const color = formData.get("color") as string;

  const slug = generateSlug(name);

  try {
    await prisma.category.create({
      data: {
        name,
        slug,
        description,
        color,
      },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, error: "Error al crear categoría" };
  }
}

export async function deleteCategory(categoryId: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { success: false, error: "No autorizado" };
  }

  try {
    await prisma.category.delete({
      where: { id: categoryId },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: "Error al eliminar categoría" };
  }
}