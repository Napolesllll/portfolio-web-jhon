"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

interface ProjectContentWrapperProps {
    children: React.ReactNode;
}

export function ProjectContentWrapper({ children }: ProjectContentWrapperProps) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="prose prose-neutral dark:prose-invert max-w-none
        prose-headings:font-display prose-headings:font-bold
        prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-4xl prose-h2:text-transparent prose-h2:bg-gradient-to-r prose-h2:from-cyan-400 prose-h2:via-blue-400 prose-h2:to-purple-400 prose-h2:bg-clip-text
        prose-h3:mt-12 prose-h3:mb-4 prose-h3:text-2xl prose-h3:text-gray-200
        prose-p:text-gray-300 prose-p:text-lg prose-p:leading-relaxed
        prose-a:text-cyan-400 prose-a:no-underline prose-a:font-semibold hover:prose-a:text-cyan-300 hover:prose-a:underline prose-a:transition-colors
        prose-strong:text-white prose-strong:font-bold
        prose-code:rounded prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:text-sm prose-code:font-mono prose-code:text-cyan-300 prose-code:border prose-code:border-white/10
        prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:backdrop-blur-md
        prose-pre:text-gray-300
        prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-img:shadow-lg prose-img:shadow-cyan-500/10 prose-img:transition-transform prose-img:hover:scale-105
        prose-blockquote:border-l-4 prose-blockquote:border-cyan-400 prose-blockquote:bg-white/5 prose-blockquote:px-4 prose-blockquote:py-3 prose-blockquote:rounded-r prose-blockquote:italic prose-blockquote:text-gray-300
        prose-hr:border-white/10 prose-hr:my-12
        prose-li:text-gray-300
        prose-ul:text-gray-300
        prose-ol:text-gray-300"
        >
            {children}
        </motion.div>
    );
}
