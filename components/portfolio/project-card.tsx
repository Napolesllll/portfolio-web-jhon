"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -12 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md h-full flex flex-col"
    >
      {/* Animated glow background on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 pointer-events-none"
      />

      {/* Featured glow effect */}
      {project.featured && (
        <motion.div
          animate={{
            boxShadow: isHovered
              ? [
                "0 0 20px rgba(34, 211, 238, 0.3)",
                "0 0 40px rgba(34, 211, 238, 0.5)",
                "0 0 20px rgba(34, 211, 238, 0.3)",
              ]
              : "0 0 0px rgba(34, 211, 238, 0)",
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
        />
      )}

      {/* Cover Image */}
      <Link href={`/projects/${project.slug}`} className="block relative overflow-hidden flex-shrink-0">
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-background-tertiary to-background">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay gradient on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent"
          />

          {/* Featured Badge */}
          {project.featured && (
            <motion.div
              animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.7 }}
              className="absolute left-4 top-4 z-10"
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-cyan-400/30 rounded-full blur-lg"
                />
                <span className="relative rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-3 py-1 text-xs font-bold text-white flex items-center gap-1">
                  ⭐ Destacado
                </span>
              </div>
            </motion.div>
          )}

          {/* Status Badge */}
          <motion.div
            animate={{ y: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0.7 }}
            className="absolute right-4 top-4 z-10"
          >
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold backdrop-blur-md border ${project.status === "COMPLETED"
                ? "bg-green-500/30 border-green-400/50 text-green-200"
                : project.status === "IN_PROGRESS"
                  ? "bg-yellow-500/30 border-yellow-400/50 text-yellow-200"
                  : "bg-gray-500/30 border-gray-400/50 text-gray-200"
                }`}
            >
              {project.status === "COMPLETED"
                ? "✓ Completado"
                : project.status === "IN_PROGRESS"
                  ? "⚡ En desarrollo"
                  : "⊛ Archivado"}
            </span>
          </motion.div>

          {/* Center action buttons - appear on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center gap-3 pointer-events-none group-hover:pointer-events-auto"
          >
            {project.liveUrl && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/90 hover:bg-cyan-500 text-white font-semibold transition-all backdrop-blur-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4" />
                  Demo
                </a>
              </motion.div>
            )}
            {project.githubUrl && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-600/90 hover:bg-gray-600 text-white font-semibold transition-all backdrop-blur-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4" />
                  Código
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </Link>

      {/* Content */}
      <div className="relative p-6 flex-1 flex flex-col justify-between z-10">
        <div>
          <Link href={`/projects/${project.slug}`}>
            <motion.h3
              animate={{ color: isHovered ? "#06b6d4" : "currentColor" }}
              className="mb-2 text-xl font-bold group-hover:text-cyan-400 transition-colors flex items-center gap-2 cursor-pointer"
            >
              {project.title}
              <motion.span
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.span>
            </motion.h3>
          </Link>

          <p className="mb-6 text-sm text-foreground-secondary line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Stack - Animated tags */}
        <div className="space-y-4">
          <motion.div
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {project.stack.slice(0, 4).map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 px-3 py-1 text-xs font-medium text-cyan-200 backdrop-blur-sm"
              >
                {tech}
              </motion.span>
            ))}
            {project.stack.length > 4 && (
              <motion.span className="rounded-lg bg-white/10 border border-white/20 px-3 py-1 text-xs font-medium text-foreground-secondary">
                +{project.stack.length - 4}
              </motion.span>
            )}
          </motion.div>

          {/* View Details Link */}
          <Link href={`/projects/${project.slug}`}>
            <motion.div
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
            >
              Ver detalles
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}