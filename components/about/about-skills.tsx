"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";

interface SkillCategory {
    category: string;
    items: string[];
    color: string;
}

interface AboutSkillsProps {
    skills: SkillCategory[];
}

export function AboutSkills({ skills }: AboutSkillsProps) {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const categoryVariants: Variants = {
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

    const skillVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative py-20 space-y-12"
        >
            {/* Background Elements */}
            <motion.div
                className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"
                animate={{ y: [0, 30, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
            >
                <h2 className="text-4xl sm:text-5xl font-bold text-white">
                    Skills & Tecnologías
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Herramientas y tecnologías que domino para crear soluciones extraordinarias
                </p>
            </motion.div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skills.map((skillGroup, groupIdx) => (
                    <motion.div
                        key={skillGroup.category}
                        variants={categoryVariants}
                        className="group relative"
                    >
                        <div
                            className={`absolute -inset-0.5 bg-gradient-to-r ${skillGroup.color} rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                        />

                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300 h-full"
                        >
                            {/* Category Header */}
                            <motion.h3
                                className={`text-lg font-bold text-transparent bg-gradient-to-r ${skillGroup.color} bg-clip-text mb-6`}
                            >
                                {skillGroup.category}
                            </motion.h3>

                            {/* Skills List */}
                            <div className="space-y-3">
                                {skillGroup.items.map((item, itemIdx) => (
                                    <motion.div
                                        key={item}
                                        variants={skillVariants}
                                        onMouseEnter={() => setHoveredSkill(`${groupIdx}-${itemIdx}`)}
                                        onMouseLeave={() => setHoveredSkill(null)}
                                        whileHover={{ x: 8 }}
                                        className="relative"
                                    >
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            whileInView={{ width: hoveredSkill === `${groupIdx}-${itemIdx}` ? "100%" : "0%" }}
                                            className={`absolute inset-0 bg-gradient-to-r ${skillGroup.color} rounded-lg opacity-10`}
                                        />

                                        <div className="relative flex items-center gap-2 px-3 py-2">
                                            <motion.div
                                                animate={
                                                    hoveredSkill === `${groupIdx}-${itemIdx}`
                                                        ? { scale: 1.2, rotate: 360 }
                                                        : { scale: 1, rotate: 0 }
                                                }
                                                transition={{ duration: 0.3 }}
                                                className={`w-2 h-2 rounded-full bg-gradient-to-r ${skillGroup.color}`}
                                            />
                                            <span
                                                className={`text-sm font-medium transition-colors ${hoveredSkill === `${groupIdx}-${itemIdx}`
                                                        ? "text-white"
                                                        : "text-gray-400"
                                                    }`}
                                            >
                                                {item}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Skill Count Badge */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: groupIdx * 0.1 + 0.4 }}
                                className={`mt-4 pt-4 border-t border-white/10 text-center text-xs font-semibold text-transparent bg-gradient-to-r ${skillGroup.color} bg-clip-text`}
                            >
                                {skillGroup.items.length} skills
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Tech Stack Visual */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
                <h3 className="text-xl font-bold text-white mb-6 text-center">
                    Mi Stack Principal
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { name: "React", color: "from-cyan-400 to-blue-500" },
                        { name: "Next.js", color: "from-white to-gray-500" },
                        { name: "TypeScript", color: "from-blue-500 to-blue-700" },
                        { name: "Tailwind CSS", color: "from-cyan-500 to-blue-500" },
                        { name: "PostgreSQL", color: "from-blue-600 to-blue-800" },
                        { name: "Prisma", color: "from-gray-200 to-white" },
                        { name: "Node.js", color: "from-green-500 to-green-700" },
                        { name: "REST API", color: "from-orange-500 to-red-500" },
                    ].map((tech, idx) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 + 0.5 }}
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="p-4 rounded-lg bg-white/5 border border-white/10 text-center hover:border-white/30 transition-all cursor-pointer group"
                        >
                            <div
                                className={`text-sm font-bold text-transparent bg-gradient-to-r ${tech.color} bg-clip-text group-hover:scale-110 transition-transform`}
                            >
                                {tech.name}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.section>
    );
}
