import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Blog Post";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
    // Generar fallback simple basado en slug
    const titleFromSlug = params.slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(to bottom right, #1e293b, #0f172a)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "80px",
                    color: "white",
                }}
            >
                {/* Title */}
                <div
                    style={{
                        fontSize: "64px",
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: "40px",
                        maxWidth: "1000px",
                    }}
                >
                    {titleFromSlug}
                </div>

                {/* Site branding */}
                <div
                    style={{
                        fontSize: "24px",
                        color: "#94a3b8",
                    }}
                >
                    jhon-cano.com
                </div>
            </div>
        ),
        { ...size }
    );
}