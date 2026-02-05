"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles, Code2, Zap } from "lucide-react";

export function AboutHero() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
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

    const floatingVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: "easeOut",
            },
        },
        animate: {
            y: [0, -20, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative py-20"
        >
            {/* Decorative elements */}
            <motion.div
                className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
                animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute top-32 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
                animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
                transition={{ duration: 10, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
                className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
            />

            <div className="relative z-10 text-center space-y-8">
                {/* Badge */}
                <motion.div variants={badgeVariants} className="flex justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                        <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Jhon Cano • Full Stack Developer
                        </span>
                    </div>
                </motion.div>

                {/* Main Title */}
                <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                    <span className="block mb-2 text-white">
                        Transformando Ideas
                    </span>
                    <span className="block text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
                        en Código
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                >
                    Especialista en crear experiencias web modernas, escalables y sorprendentes.
                    Con más de 4 años de experiencia en Full Stack Development.
                </motion.p>

                {/* Stats Container */}
                <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-12">
                    {[
                        { icon: Code2, label: "Proyectos", value: "20+" },
                        { icon: Zap, label: "Experiencia", value: "4+ años" },
                        { icon: Sparkles, label: "Clientes", value: "15+" },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            variants={floatingVariants}
                            animate="animate"
                            className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-cyan-500/50 transition-colors"
                        >
                            <stat.icon className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                            <div className="text-sm text-gray-400">{stat.label}</div>
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mt-12">
                    <a
                        href="#journey"
                        className="group relative px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold overflow-hidden transition-all hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Mi Viaje
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <a
                        href="mailto:canojhon148@gmail.com"
                        className="px-8 py-3 rounded-lg border border-cyan-500/50 text-cyan-400 font-semibold hover:bg-cyan-500/10 transition-all hover:shadow-lg hover:shadow-cyan-500/25"
                    >
                        Contactame
                    </a>
                </motion.div>
            </div>
        </motion.section>
    );
}
