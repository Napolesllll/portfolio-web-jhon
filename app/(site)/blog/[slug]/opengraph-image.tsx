import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";

export const runtime = "edge";
export const alt = "Blog Post";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
    type Post = {
        title: string;
        excerpt: string | null;
        readingTime: number;
        author: { name: string | null };
        category: {
            name: string;
            color: string;
        };
    };

    const post: Post | null = await prisma.post.findUnique({
        where: { slug: params.slug },
        select: {
            title: true,
            excerpt: true,
            readingTime: true,
            author: {
                select: {
                    name: true,
                },
            },
            category: {
                select: {
                    name: true,
                    color: true,
                },
            },
        },
    });

    if (!post) {
        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 128,
                        background: "linear-gradient(to bottom right, #1e293b, #0f172a)",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                    }}
                >
                    Post no encontrado
                </div>
            ),
            { ...size }
        );
    }

    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(to bottom right, #1e293b, #0f172a)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    padding: "80px",
                    color: "white",
                }}
            >
                {/* Category Badge */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: post.category.color,
                        padding: "12px 24px",
                        borderRadius: "999px",
                        fontSize: "24px",
                        fontWeight: "600",
                    }}
                >
                    {post.category.name}
                </div>

                {/* Title */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "72px",
                            fontWeight: "900",
                            lineHeight: "1.2",
                            margin: 0,
                            background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                            backgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        {post.title}
                    </h1>
                    {post.excerpt && (
                        <p
                            style={{
                                fontSize: "32px",
                                color: "#94a3b8",
                                margin: 0,
                                maxWidth: "900px",
                            }}
                        >
                            {post.excerpt.substring(0, 120)}...
                        </p>
                    )}
                </div>

                {/* Footer */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "24px",
                                color: "#94a3b8",
                            }}
                        >
                            {post.author.name}
                        </div>
                        <div
                            style={{
                                fontSize: "24px",
                                color: "#64748b",
                            }}
                        >
                            •
                        </div>
                        <div
                            style={{
                                fontSize: "24px",
                                color: "#94a3b8",
                            }}
                        >
                            {post.readingTime} min lectura
                        </div>
                    </div>

                    <div
                        style={{
                            fontSize: "32px",
                            fontWeight: "700",
                            background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                            backgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        jhoncano.com
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}