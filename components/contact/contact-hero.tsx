"use client";

import { motion, Variants } from "framer-motion";

export function ContactHero() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative overflow-hidden mb-20"
        >
            {/* Background Orbs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {/* Orb 1 - Cyan */}
                <motion.div
                    className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl"
                    animate={{
                        y: [0, 30, 0],
                        x: [0, 20, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                {/* Orb 2 - Blue */}
                <motion.div
                    className="absolute top-1/3 -right-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"
                    animate={{
                        y: [0, -30, 0],
                        x: [0, -20, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                    }}
                />
                {/* Orb 3 - Purple */}
                <motion.div
                    className="absolute -bottom-40 left-1/3 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"
                    animate={{
                        y: [0, 20, 0],
                        x: [0, -30, 0],
                    }}
                    transition={{
                        duration: 11,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative text-center py-16">
                <motion.h1
                    variants={itemVariants}
                    className="mb-4 font-display text-5xl sm:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                >
                    Contacto
                </motion.h1>
                <motion.p
                    variants={itemVariants}
                    className="mx-auto max-w-2xl text-lg text-gray-300"
                >
                    ¿Tienes un proyecto en mente? Hablemos y hagamos algo increíble juntos.
                </motion.p>
            </div>
        </motion.div>
    );
}
