"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, Eye, User, Bookmark, Share2 } from "lucide-react";
import { formatDate, formatNumber } from "@/lib/utils";

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

interface BlogPostHeroProps {
    title: string;
    excerpt?: string | null;
    coverImage?: string | null;
    category: { name: string; color?: string };
    author: { name?: string | null; image?: string | null };
    publishedAt?: Date | null;
    readingTime: number;
    views: number;
}

export function BlogPostHero({
    title,
    excerpt,
    coverImage,
    category,
    author,
    publishedAt,
    readingTime,
    views,
}: BlogPostHeroProps) {
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
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-20 space-y-8"
            >
                {/* Category Badge */}
                <motion.div variants={badgeVariants}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span className="text-xs font-semibold text-gray-200">
                            {category.name}
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

                {/* Excerpt */}
                {excerpt && (
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-300 max-w-3xl leading-relaxed"
                    >
                        {excerpt}
                    </motion.p>
                )}

                {/* Meta Information */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap items-center gap-6 pt-4"
                >
                    {/* Author */}
                    {author.name && (
                        <div className="flex items-center gap-3">
                            {author.image && (
                                <Image
                                    src={author.image}
                                    alt={author.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full ring-2 ring-cyan-400/30"
                                />
                            )}
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-300 font-medium">
                                    {author.name}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Divider */}
                    {author.name && (
                        <div className="w-1 h-6 bg-gradient-to-b from-cyan-400/20 to-blue-400/20" />
                    )}

                    {/* Published Date */}
                    {publishedAt && (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"
                        >
                            <Calendar className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm text-gray-300">
                                {formatDate(publishedAt)}
                            </span>
                        </motion.div>
                    )}

                    {/* Reading Time */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"
                    >
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-300">
                            {readingTime} min de lectura
                        </span>
                    </motion.div>

                    {/* Views */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"
                    >
                        <Eye className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-300">
                            {formatNumber(views)} vistas
                        </span>
                    </motion.div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex gap-3 pt-4"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 hover:bg-cyan-500/30 transition-all"
                    >
                        <Bookmark className="w-4 h-4" />
                        <span className="text-sm font-medium">Guardar</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20 transition-all"
                    >
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Compartir</span>
                    </motion.button>
                </motion.div>
            </motion.div>
        </>
    );
}
