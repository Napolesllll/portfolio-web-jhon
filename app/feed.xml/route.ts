import { prisma } from "@/lib/prisma";

export async function GET() {
  const baseUrl = "https://jhoncano.com"; // Cambia por tu dominio

  type Post = {
    title: string;
    slug: string;
    excerpt: string | null;
    publishedAt: Date | null;
    author: { name: string | null };
    category: { name: string };
  };

  const posts: Post[] = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
      category: {
        select: { name: true },
      },
    },
    orderBy: { publishedAt: "desc" },
    take: 20,
  });

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Jhon Cano - Blog</title>
    <link>${baseUrl}</link>
    <description>Full Stack Developer especializado en React, Next.js y TypeScript</description>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post: Post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt || ""}]]></description>
      <pubDate>${post.publishedAt?.toUTCString()}</pubDate>
      <author>${post.author.name || "Jhon Cano"}</author>
      <category>${post.category.name}</category>
    </item>
    `
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}