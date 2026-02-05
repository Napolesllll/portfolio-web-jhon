"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

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

interface RelatedPost {
    id: string;
    slug: string;
    title: string;
    excerpt?: string | null;
    coverImage?: string | null;
    publishedAt?: Date | null;
    readingTime: number;
}

interface BlogRelatedPostsProps {
    posts: RelatedPost[];
}

export function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
    if (posts.length === 0) return null;

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
                        Artículos Relacionados
                    </h2>
                </div>
                <p className="text-gray-400 text-lg">
                    Continúa leyendo artículos del mismo tema
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
                {posts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        custom={index}
                        variants={cardVariants}
                        whileHover={{ y: -8 }}
                        className="group"
                    >
                        <Link href={`/blog/${post.slug}`}>
                            <motion.div className="relative h-full rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md hover:border-cyan-400/50 transition-all duration-300">
                                {/* Cover Image */}
                                {post.coverImage && (
                                    <div className="relative h-40 overflow-hidden bg-black/20">
                                        <Image
                                            src={post.coverImage}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    {/* Excerpt */}
                                    {post.excerpt && (
                                        <p className="text-sm text-gray-400 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    {/* Meta */}
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 pt-2">
                                        {post.publishedAt && (
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3 text-cyan-400/60" />
                                                <span>{formatDate(post.publishedAt)}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-blue-400/60" />
                                            <span>{post.readingTime} min</span>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        className="flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300 font-semibold text-sm pt-2"
                                    >
                                        <span>Leer más</span>
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
