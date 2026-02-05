"use client";

import { motion, Variants } from "framer-motion";
import { Code2, Cpu } from "lucide-react";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
        },
    },
};

interface ProjectTechStackProps {
    stack: string[];
}

export function ProjectTechStack({ stack }: ProjectTechStackProps) {
    const techIcons: Record<string, string> = {
        React: "⚛️",
        "Next.js": "▲",
        TypeScript: "📘",
        "Node.js": "🟢",
        Python: "🐍",
        PostgreSQL: "🐘",
        MongoDB: "🍃",
        "TailwindCSS": "🎨",
        Docker: "🐳",
        AWS: "☁️",
        Firebase: "🔥",
        GraphQL: "◆",
        "Vue.js": "💚",
        Angular: "🔴",
        Express: "⚡",
        "Socket.IO": "🔌",
        Redis: "📦",
        Prisma: "💎",
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3"
            >
                <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-400" />
                <div>
                    <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
                        Stack Tecnológico
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">
                        Tecnologías y herramientas utilizadas en este proyecto
                    </p>
                </div>
            </motion.div>

            {/* Tech Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {stack.map((tech, i) => {
                    const icon = techIcons[tech] || "🔧";

                    return (
                        <motion.div
                            key={tech}
                            custom={i}
                            variants={itemVariants}
                            whileHover={{ scale: 1.08, y: -4 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative px-4 py-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 group-hover:border-cyan-400/50 transition-all backdrop-blur-md hover:bg-white/15">
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-3xl">{icon}</span>
                                    <span className="text-sm font-semibold text-center text-gray-200 group-hover:text-cyan-300 transition-colors">
                                        {tech}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
