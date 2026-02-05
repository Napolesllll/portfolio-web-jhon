"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
        },
    },
};

interface RelatedProjectCardProps {
    slug: string;
    title: string;
    description: string;
    coverImage: string;
    featured?: boolean;
    stack?: string[];
}

interface ProjectRelatedProjectsProps {
    projects: RelatedProjectCardProps[];
}

export function ProjectRelatedProjects({ projects }: ProjectRelatedProjectsProps) {
    if (projects.length === 0) return null;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-20 pt-16 border-t border-white/10"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-400" />
                    <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
                        Proyectos Relacionados
                    </h2>
                </div>
                <p className="text-gray-400 text-lg">
                    Otros proyectos que usan tecnologías similares
                </p>
            </motion.div>

            {/* Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
                {projects.map((project, index) => (
                    <motion.div
                        key={project.slug}
                        custom={index}
                        variants={cardVariants}
                        whileHover={{ y: -8 }}
                        className="group"
                    >
                        <Link href={`/projects/${project.slug}`}>
                            <motion.div className="relative h-full rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md hover:border-cyan-400/50 transition-all duration-300">
                                {/* Cover Image */}
                                <div className="relative h-40 overflow-hidden bg-black/20">
                                    <Image
                                        src={project.coverImage}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />

                                    {/* Featured Badge */}
                                    {project.featured && (
                                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-400/50 text-xs font-semibold text-yellow-200">
                                            ⭐ Destacado
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-gray-400 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    {project.stack && project.stack.length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {project.stack.slice(0, 3).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300 hover:text-cyan-300 hover:border-cyan-400/50 transition-colors"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.stack.length > 3 && (
                                                <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-400">
                                                    +{project.stack.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        className="flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300 font-semibold text-sm pt-2"
                                    >
                                        <span>Ver Proyecto</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
