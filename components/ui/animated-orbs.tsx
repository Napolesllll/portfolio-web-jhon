"use client";

import { motion, Variants } from "framer-motion";

export function AnimatedOrbs() {
    const orbVariants: Variants = {
        animate: (custom: number) => ({
            y: [0, 40, 0],
            x: [0, 30, 0],
            transition: {
                duration: 10 + custom * 2,
                repeat: Infinity,
                ease: "easeInOut",
            },
        }),
    };

    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Orb 1 - Cyan */}
            <motion.div
                custom={0}
                animate="animate"
                variants={orbVariants}
                className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-500/40 to-blue-500/20 rounded-full blur-3xl"
            />

            {/* Orb 2 - Blue */}
            <motion.div
                custom={1}
                animate="animate"
                variants={orbVariants}
                className="absolute top-1/4 -right-40 w-96 h-96 bg-gradient-to-bl from-blue-500/40 to-purple-500/20 rounded-full blur-3xl"
            />

            {/* Orb 3 - Purple */}
            <motion.div
                custom={2}
                animate="animate"
                variants={orbVariants}
                className="absolute -bottom-40 left-1/3 w-80 h-80 bg-gradient-to-tr from-purple-500/40 to-pink-500/20 rounded-full blur-3xl"
            />
        </div>
    );
}
