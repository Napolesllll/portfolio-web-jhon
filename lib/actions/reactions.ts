"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type ReactionType = "FIRE" | "LIGHTBULB" | "THINKING";

export async function addReaction(postId: string, type: ReactionType) {
  try {
    await prisma.reaction.create({
      data: {
        type,
        postId,
      },
    });

    revalidatePath(`/blog/*`);
    return { success: true };
  } catch (error) {
    console.error("Error adding reaction:", error);
    return { success: false };
  }
}

export async function getReactionCounts(postId: string) {
  const reactions = await prisma.reaction.groupBy({
    by: ["type"],
    where: { postId },
    _count: true,
  });

  return {
    FIRE: reactions.find((r) => r.type === "FIRE")?._count || 0,
    LIGHTBULB: reactions.find((r) => r.type === "LIGHTBULB")?._count || 0,
    THINKING: reactions.find((r) => r.type === "THINKING")?._count || 0,
  };
}