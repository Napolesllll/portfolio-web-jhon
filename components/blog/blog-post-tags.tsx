"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Tag } from "lucide-react";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const tagVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.5,
        },
    }),
};

interface BlogPostTagsProps {
    tags: Array<{ id: string; name: string; slug: string }>;
}

export function BlogPostTags({ tags }: BlogPostTagsProps) {
    if (tags.length === 0) return null;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 pt-12 border-t border-white/10"
        >
            <div className="flex items-center gap-3 mb-6">
                <Tag className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-semibold text-gray-200">
                    Temas cubiertos
                </h3>
            </div>

            <div className="flex flex-wrap gap-3">
                {tags.map((tag, i) => (
                    <motion.div
                        key={tag.id}
                        custom={i}
                        variants={tagVariants}
                    >
                        <Link href={`/blog?tag=${tag.slug}`}>
                            <motion.div
                                whileHover={{ scale: 1.08, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 hover:border-cyan-400/50 text-cyan-300 hover:text-cyan-200 font-medium text-sm transition-all cursor-pointer"
                            >
                                #{tag.name}
                            </motion.div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
