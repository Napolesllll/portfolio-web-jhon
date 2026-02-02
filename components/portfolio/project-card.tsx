"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProjectCardProps = {
  project: {
    slug: string;
    title: string;
    description: string;
    coverImage: string;
    stack: string[];
    liveUrl: string | null;
    githubUrl: string | null;
    featured: boolean;
    status: string;
  };
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl border border-border bg-background-secondary"
    >
      {/* Cover Image */}
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden bg-background-tertiary">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-smooth group-hover:scale-105"
          />

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute left-4 top-4">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Destacado
              </span>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute right-4 top-4">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                project.status === "COMPLETED"
                  ? "bg-green-500/90 text-white"
                  : project.status === "IN_PROGRESS"
                  ? "bg-yellow-500/90 text-white"
                  : "bg-gray-500/90 text-white"
              }`}
            >
              {project.status === "COMPLETED"
                ? "🟢 Completado"
                : project.status === "IN_PROGRESS"
                ? "🟡 En desarrollo"
                : "⚫ Archivado"}
            </span>
          </div>
        </div>
      </Link>

      {/* Overlay con acciones */}
      <div className="absolute inset-0 top-0 flex items-center justify-center gap-2 bg-background/80 opacity-0 backdrop-blur-sm transition-smooth group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
        {project.liveUrl && (
          <Button size="sm" variant="secondary" asChild>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Demo
            </a>
          </Button>
        )}
        {project.githubUrl && (
          <Button size="sm" variant="secondary" asChild>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="mr-2 h-4 w-4" />
              Código
            </a>
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <Link href={`/projects/${project.slug}`}>
          <h3 className="mb-2 text-xl font-bold transition-smooth group-hover:text-primary">
            {project.title}
          </h3>
        </Link>

        <p className="mb-4 text-sm text-foreground-secondary line-clamp-2">
          {project.description}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-background-tertiary px-2 py-1 text-xs font-medium text-foreground-secondary"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="rounded-md bg-background-tertiary px-2 py-1 text-xs font-medium text-foreground-secondary">
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}