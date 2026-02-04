import { prisma } from "@/lib/prisma";
import { cache } from "react";

/**
 * Obtener todos los posts publicados (con cache de React)
 */
export const getAllPosts = cache(async () => {
  return await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
      category: {
        select: {
          name: true,
          slug: true,
          color: true,
        },
      },
      tags: {
        select: {
          name: true,
          slug: true,
        },
      },
      _count: {
        select: {
          reactions: true,
        },
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
  });
});

/**
 * Obtener post por slug
 */
export async function getPostBySlug(slug: string) {
  if (!slug) {
    return null;
  }

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          name: true,
          image: true,
          email: true,
        },
      },
      category: {
        select: {
          name: true,
          slug: true,
          color: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      reactions: true,
      _count: {
        select: {
          reactions: true,
        },
      },
    },
  });

  return post;
}

export const getPostBySlugCached = cache(getPostBySlug);

/**
 * Obtener posts relacionados (por categoría)
 */
export const getRelatedPosts = cache(async (postId: string, categoryId: string, limit = 3) => {
  return await prisma.post.findMany({
    where: {
      published: true,
      categoryId,
      NOT: {
        id: postId,
      },
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
      category: {
        select: {
          name: true,
          slug: true,
          color: true,
        },
      },
    },
    take: limit,
    orderBy: {
      publishedAt: "desc",
    },
  });
});

/**
 * Incrementar vistas de un post
 */
export async function incrementPostViews(slug: string) {
  await prisma.post.update({
    where: { slug },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}

/**
 * Obtener todas las categorías
 */
export const getAllCategories = cache(async () => {
  return await prisma.category.findMany({
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
});

/**
 * Obtener todos los tags
 */
export const getAllTags = cache(async () => {
  return await prisma.tag.findMany({
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
});