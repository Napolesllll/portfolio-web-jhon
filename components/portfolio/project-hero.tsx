"use client";

import { motion, Variants } from "framer-motion";
import { ExternalLink, Github, Star, Eye } from "lucide-react";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
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

const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
        },
    },
};

interface ProjectHeroProps {
    title: string;
    description: string;
    featured?: boolean;
    status: "COMPLETED" | "IN_PROGRESS" | "ARCHIVED";
    liveUrl?: string | null;
    githubUrl?: string | null;
}

export function ProjectHero({
    title,
    description,
    featured,
    status,
    liveUrl,
    githubUrl,
}: ProjectHeroProps) {
    const statusConfig = {
        COMPLETED: {
            label: "✅ Completado",
            color: "from-green-400 to-emerald-400",
            bgColor: "bg-green-500/10 border-green-400/30",
        },
        IN_PROGRESS: {
            label: "🚀 En Desarrollo",
            color: "from-blue-400 to-cyan-400",
            bgColor: "bg-blue-500/10 border-blue-400/30",
        },
        ARCHIVED: {
            label: "📦 Archivado",
            color: "from-gray-400 to-slate-400",
            bgColor: "bg-gray-500/10 border-gray-400/30",
        },
    };

    const config = statusConfig[status];

    return (
        <>
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                {/* Cyan Orb */}
                <motion.div
                    className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-500/30 to-cyan-500/0 rounded-full blur-3xl"
                    animate={{
                        y: [0, 50, 0],
                        x: [0, 30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Blue Orb */}
                <motion.div
                    className="absolute top-20 -left-32 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-blue-500/0 rounded-full blur-3xl"
                    animate={{
                        y: [0, -40, 0],
                        x: [0, -50, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                    }}
                />

                {/* Purple Orb */}
                <motion.div
                    className="absolute -bottom-20 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-purple-500/0 rounded-full blur-3xl"
                    animate={{
                        y: [0, 40, 0],
                        x: [0, 60, 0],
                    }}
                    transition={{
                        duration: 11,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-20 space-y-8"
            >
                {/* Badges */}
                <motion.div variants={badgeVariants} className="flex flex-wrap gap-3">
                    {featured && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/50">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-semibold text-yellow-200">
                                Proyecto Destacado
                            </span>
                        </div>
                    )}

                    <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md ${config.bgColor}`}
                    >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r ${config.color}" />
                        <span className="text-sm font-semibold text-white">
                            {config.label}
                        </span>
                    </div>
                </motion.div>

                {/* Title */}
                <motion.div variants={itemVariants}>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                        <span className="text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
                            {title}
                        </span>
                    </h1>
                </motion.div>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="text-xl text-gray-300 max-w-3xl leading-relaxed"
                >
                    {description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap gap-4 pt-4"
                >
                    {liveUrl && (
                        <motion.a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-400/50 text-cyan-200 hover:text-cyan-100 font-semibold hover:border-cyan-400 transition-all"
                        >
                            <ExternalLink className="w-5 h-5" />
                            <span>Ver Demo en Vivo</span>
                        </motion.a>
                    )}

                    {githubUrl && (
                        <motion.a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-gray-300 hover:text-white font-semibold hover:bg-white/20 hover:border-white/40 transition-all"
                        >
                            <Github className="w-5 h-5" />
                            <span>Ver Código Fuente</span>
                        </motion.a>
                    )}
                </motion.div>
            </motion.div>
        </>
    );
}
