"use client";

import { motion, Variants } from "framer-motion";
import { Search, Tag, BookOpen, ArrowRight } from "lucide-react";
import { useState } from "react";

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
            ease: "easeOut",
        },
    },
};

const tagVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: i * 0.05,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export function BlogHeader() {
    const [selectedTag, setSelectedTag] = useState("Todos");
    const [searchQuery, setSearchQuery] = useState("");
    const [hoveredTag, setHoveredTag] = useState<string | null>(null);

    const tags = ["Todos", "React", "Next.js", "TypeScript", "Performance", "Tutorial"];

    return (
        <>
            {/* Animated background elements */}
            <motion.div
                className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
                animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
                className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
                animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
                transition={{ duration: 12, repeat: Infinity, delay: 1 }}
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative mb-20 text-center space-y-6"
            >
                {/* Badge */}
                <motion.div variants={badgeVariants} className="inline-flex justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 backdrop-blur-md hover:border-blue-400/50 transition-all group">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                            <BookOpen className="w-4 h-4 text-blue-400" />
                        </motion.div>
                        <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Conocimiento compartido
                        </span>
                        <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                            <ArrowRight className="w-3 h-3 text-purple-400" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Main Title */}
                <motion.div variants={itemVariants}>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                        <span className="block mb-2 text-white">Artículos &</span>
                        <span className="text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text">
                            Insights
                        </span>
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="mx-auto max-w-3xl text-lg text-gray-300 leading-relaxed"
                >
                    Explora mis escribencias sobre desarrollo web, React, Next.js, TypeScript y las últimas
                    tendencias en tecnología. Cada artículo es una oportunidad para aprender y crecer juntos.
                </motion.p>

                {/* Stats */}
                <motion.div variants={itemVariants} className="flex justify-center gap-8 pt-4">
                    {[
                        { label: "Artículos", value: "50+" },
                        { label: "Temas", value: "15+" },
                        { label: "Lectores", value: "5K+" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="text-center"
                        >
                            <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mb-16 space-y-6"
            >
                {/* Search Input */}
                <motion.div
                    variants={itemVariants}
                    className="relative"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-xl blur opacity-0 hover:opacity-30 transition-opacity duration-500" />
                    <div className="relative group">
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2"
                        >
                            <Search className="w-5 h-5 text-cyan-400 group-focus-within:text-blue-400 transition-colors" />
                        </motion.div>
                        <input
                            type="text"
                            placeholder="Buscar artículos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="relative w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all backdrop-blur-md focus:bg-white/10"
                        />
                    </div>
                </motion.div>

                {/* Filter Tags */}
                <motion.div
                    className="flex flex-wrap gap-3 justify-center"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.08,
                            },
                        },
                    }}
                >
                    {tags.map((tag, i) => (
                        <motion.button
                            key={tag}
                            custom={i}
                            variants={tagVariants}
                            initial="hidden"
                            animate="visible"
                            onMouseEnter={() => setHoveredTag(tag)}
                            onMouseLeave={() => setHoveredTag(null)}
                            whileHover={{ scale: 1.08, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedTag(tag)}
                            className={`group relative px-6 py-2 rounded-full backdrop-blur-md border transition-all text-sm font-medium overflow-hidden ${selectedTag === tag
                                    ? "bg-cyan-500/30 border-cyan-400/50 text-cyan-300 shadow-lg shadow-cyan-400/20"
                                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30"
                                }`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity`} />
                            <span className="relative flex items-center gap-2">
                                <motion.div
                                    animate={hoveredTag === tag ? { rotate: 360 } : { rotate: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                    <Tag className="w-3 h-3" />
                                </motion.div>
                                {tag}
                            </span>
                        </motion.button>
                    ))}
                </motion.div>
            </motion.div>
        </>
    );
}
