import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/structured-data";

export const metadata: Metadata = {
    title: "Sobre mí",
    description:
        "Conoce más sobre Jhon Cano, Full Stack Developer de Medellín, Colombia. Experiencia, skills y tecnologías.",
};

const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { category: "Backend", items: ["Node.js", "Prisma", "PostgreSQL", "REST APIs"] },
    { category: "Tools", items: ["Git", "Docker", "Vercel", "Figma"] },
    { category: "Soft Skills", items: ["Comunicación", "Trabajo en equipo", "Resolución de problemas"] },
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

            <div className="container mx-auto max-w-4xl px-4 py-12">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 font-display text-4xl font-bold sm:text-5xl">
                        Sobre mí
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-foreground-secondary">
                        Full Stack Developer apasionado por crear experiencias web
                        extraordinarias
                    </p>
                </div>

                {/* Bio */}
                <div className="mb-16 rounded-xl border border-border bg-background-secondary p-8">
                    <div className="mb-6 flex items-start gap-6">
                        <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-primary">
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-accent text-6xl text-white">
                                JC
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-2 text-2xl font-bold">Jhon Cano</h2>
                            <p className="mb-4 text-foreground-secondary">
                                Full Stack Developer
                            </p>
                            <div className="flex items-center gap-2 text-sm text-foreground-tertiary">
                                <MapPin className="h-4 w-4" />
                                Medellín, Colombia
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 text-foreground-secondary">
                        <p>
                            👋 ¡Hola! Soy Jhon, un desarrollador Full Stack de Medellín,
                            Colombia, especializado en crear aplicaciones web modernas y
                            escalables.
                        </p>
                        <p>
                            💻 Mi stack principal incluye React, Next.js, TypeScript y
                            Tailwind CSS en el frontend, con Node.js, Prisma y PostgreSQL en
                            el backend. Me apasiona crear experiencias de usuario excepcionales
                            con código limpio y mantenible.
                        </p>
                        <p>
                            🚀 Con experiencia en desarrollo de productos desde cero hasta
                            producción, me enfoco en escribir código escalable, performante y
                            fácil de mantener.
                        </p>
                        <p>
                            🌱 Siempre estoy aprendiendo nuevas tecnologías y mejores
                            prácticas para crear mejores soluciones.
                        </p>
                    </div>
                </div>

                {/* Skills */}
                <div className="mb-16">
                    <h2 className="mb-8 font-display text-3xl font-bold">
                        Skills & Tecnologías
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2">
                        {skills.map((skillGroup) => (
                            <div
                                key={skillGroup.category}
                                className="rounded-xl border border-border bg-background-secondary p-6"
                            >
                                <h3 className="mb-4 font-semibold text-primary">
                                    {skillGroup.category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {skillGroup.items.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-lg bg-background-tertiary px-3 py-1 text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div className="rounded-xl border border-border bg-background-secondary p-8 text-center">
                    <h2 className="mb-4 font-display text-2xl font-bold">
                        ¿Trabajamos juntos?
                    </h2>
                    <p className="mb-6 text-foreground-secondary">
                        Estoy abierto a nuevas oportunidades y colaboraciones
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild>
                            <a href="mailto:canojhon148@gmail.com">
                                <Mail className="mr-2 h-4 w-4" />
                                Enviar Email
                            </a>
                        </Button>
                        <Button asChild variant="secondary">
                            <a
                                href="https://github.com/jhoncano"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                            </a>
                        </Button>
                        <Button asChild variant="secondary">
                            <a
                                href="https://linkedin.com/in/jhoncano"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Linkedin className="mr-2 h-4 w-4" />
                                LinkedIn
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
