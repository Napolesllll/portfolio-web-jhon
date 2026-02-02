import { prisma } from "@/lib/prisma";
import { cache } from "react";

/**
 * Obtener todos los proyectos
 */
export const getAllProjects = cache(async () => {
  return await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
  });
});

/**
 * Obtener proyectos destacados
 */
export const getFeaturedProjects = cache(async () => {
  return await prisma.project.findMany({
    where: { featured: true },
    orderBy: { order: "asc" },
    take: 6,
  });
});

/**
 * Obtener proyecto por slug
 */
export const getProjectBySlug = cache(async (slug: string) => {
  return await prisma.project.findUnique({
    where: { slug },
  });
});

/**
 * Obtener proyectos relacionados (por stack similar)
 */
export const getRelatedProjects = cache(
  async (projectId: string, stack: string[], limit = 3) => {
    return await prisma.project.findMany({
      where: {
        NOT: { id: projectId },
        stack: {
          hasSome: stack,
        },
      },
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }
);

/**
 * Obtener todas las tecnologías únicas
 */
export const getAllTechnologies = cache(async () => {
  const projects = await prisma.project.findMany({
    select: { stack: true },
  });

  const allTech = projects.flatMap((p) => p.stack);
  const uniqueTech = Array.from(new Set(allTech)).sort();

  return uniqueTech;
});