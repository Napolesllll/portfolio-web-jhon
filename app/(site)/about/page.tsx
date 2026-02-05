import { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { AboutHero } from "@/components/about/about-hero";
import { AboutBio } from "@/components/about/about-bio";
import { AboutJourney } from "@/components/about/about-journey";
import { AboutSkills } from "@/components/about/about-skills";
import { AboutContact } from "@/components/about/about-contact";

export const metadata: Metadata = {
    title: "Sobre mí",
    description:
        "Conoce más sobre Jhon Cano, Full Stack Developer de Medellín, Colombia. Experiencia, skills y tecnologías.",
};

const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"], color: "from-blue-500 to-cyan-500" },
    { category: "Backend", items: ["Node.js", "Prisma", "PostgreSQL", "REST APIs"], color: "from-green-500 to-emerald-500" },
    { category: "Tools", items: ["Git", "Docker", "Vercel", "Figma"], color: "from-purple-500 to-pink-500" },
    { category: "Soft Skills", items: ["Comunicación", "Trabajo en equipo", "Resolución de problemas"], color: "from-yellow-500 to-orange-500" },
];

const journey = [
    {
        year: "2020",
        title: "Primeros pasos en programación",
        description: "Iniciaba mi carrera en desarrollo web con HTML, CSS y JavaScript vanilla.",
        icon: "🚀",
    },
    {
        year: "2021",
        title: "React & Frontend mastery",
        description: "Me especialicé en React y aprendí TypeScript para escribir código más robusto.",
        icon: "⚛️",
    },
    {
        year: "2022",
        title: "Full Stack Developer",
        description: "Profundizé en backend con Node.js, Prisma y bases de datos SQL.",
        icon: "🔧",
    },
    {
        year: "2023-2024",
        title: "Next.js & Scale",
        description: "Dominé Next.js y trabajé en proyectos de escala empresarial.",
        icon: "📈",
    },
    {
        year: "2025",
        title: "Innovación & AI",
        description: "Explorando integraciones con IA y arquitecturas modernas serverless.",
        icon: "🤖",
    },
];

export default function AboutPage() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Jhon Cano",
        jobTitle: "Full Stack Developer",
        url: "https://jhoncano.com",
        sameAs: [
            "https://github.com/jhoncano",
            "https://linkedin.com/in/jhoncano",
            "https://twitter.com/jhoncano",
        ],
        address: {
            "@type": "PostalAddress",
            addressLocality: "Medellín",
            addressRegion: "Antioquia",
            addressCountry: "CO",
        },
        email: "canojhon148@gmail.com",
        knowsAbout: [
            "React",
            "Next.js",
            "TypeScript",
            "JavaScript",
            "Node.js",
            "Web Development",
        ],
    };

    return (
        <>
            <StructuredData data={structuredData} />

            <div className="relative overflow-hidden">
                {/* Background with animated elements */}
                <div className="fixed inset-0 -z-10 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />
                </div>

                <div className="container mx-auto max-w-6xl px-4 py-12 relative space-y-20">
                    {/* Hero Section */}
                    <AboutHero />

                    {/* Bio Section */}
                    <AboutBio />

                    {/* Journey Timeline */}
                    <AboutJourney journey={journey} />

                    {/* Skills Section */}
                    <AboutSkills skills={skills} />

                    {/* Contact Section */}
                    <AboutContact />
                </div>
            </div>
        </>
    );
}
