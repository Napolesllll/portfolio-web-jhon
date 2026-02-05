"use client";

import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, Sparkles, Code2, Zap, Rocket } from "lucide-react";

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

const techVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -20 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        rotateY: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.6,
        },
    }),
};

interface ProjectsHeaderProps {
    onFilterChange?: (selectedTechs: string[]) => void;
}

const techList = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "TailwindCSS",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "AWS",
];

export function ProjectsHeader({ onFilterChange }: ProjectsHeaderProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTech = (tech: string) => {
        setSelectedTechs((prev) => {
            const newSelected = prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech];
            onFilterChange?.(newSelected);
            return newSelected;
        });
    };

    if (!mounted) return null;

    return (
        <>
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

                {/* Purple Orb */}
                <motion.div
                    className="absolute -bottom-20 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-purple-500/0 rounded-full blur-3xl"
                    animate={{
                        y: [0, 40, 0],
                        x: [0, 60, 0],
                    }}
                    transition={{
                        duration: 11,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
            </div>

            {/* Header Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-20 text-center space-y-8 mb-16"
            >
                {/* Badge */}
                <motion.div variants={badgeVariants}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Rocket className="w-4 h-4 text-cyan-400" />
                        </motion.div>
                        <span className="text-sm font-medium text-gray-300">
                            Proyectos Destacados
                        </span>
                    </div>
                </motion.div>

                {/* Main Title */}
                <motion.div variants={itemVariants}>
                    <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                        Mi{" "}
                        <span className="text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
                            Portafolio
                        </span>
                        <br />
                        <span className="text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
                            Proyectos Épicos
                        </span>
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="mx-auto max-w-3xl text-lg text-gray-300 leading-relaxed"
                >
                    Explora mis casos de estudio, soluciones innovadoras y proyectos que demuestran mis
                    habilidades en desarrollo web full stack. Cada proyecto representa un desafío único
                    y una oportunidad para crear impacto.
                </motion.p>

                {/* Stats */}
                <motion.div variants={itemVariants} className="flex justify-center gap-8 pt-4">
                    {[
                        { icon: Code2, label: "Proyectos", value: "20+" },
                        { icon: Sparkles, label: "Tecnologías", value: "15+" },
                        { icon: Zap, label: "Soluciones", value: "30+" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="text-center"
                        >
                            <stat.icon className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
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
                className="mb-16"
            >
                {/* Search Input */}
                <motion.div
                    variants={itemVariants}
                    className="relative mb-10"
                >
                    <div className="relative group">
                        <motion.div
                            className="absolute left-4 top-1/2 transform -translate-y-1/2"
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Search className="w-5 h-5 text-cyan-400/60 group-focus-within:text-cyan-400 transition-colors" />
                        </motion.div>
                        <input
                            type="text"
                            placeholder="Buscar proyectos por nombre, descripción o tecnología..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-foreground placeholder:text-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all backdrop-blur-md"
                        />
                    </div>
                </motion.div>

                {/* Technology Filter Tags */}
                <motion.div
                    variants={itemVariants}
                    className="space-y-6"
                >
                    <div>
                        <p className="text-sm font-medium text-gray-300 mb-4 text-center">
                            Filtrar por tecnología:
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center min-h-[48px]">
                            {/* Todos button */}
                            <motion.button
                                variants={techVariants}
                                initial="hidden"
                                animate="visible"
                                custom={0}
                                whileHover={{ scale: 1.08, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedTechs([])}
                                onHoverStart={() => setHoveredTech("all")}
                                onHoverEnd={() => setHoveredTech(null)}
                                className={`relative px-5 py-2.5 rounded-full backdrop-blur-md border transition-all text-sm font-medium z-10 cursor-pointer ${selectedTechs.length === 0
                                    ? "bg-cyan-500/30 border-cyan-400/50 text-cyan-200 shadow-lg shadow-cyan-500/20"
                                    : "bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40 text-gray-300"
                                    }`}
                            >
                                {/* Animated background on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full pointer-events-none"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ originX: 0 }}
                                />
                                <span className="relative z-20 flex items-center gap-2">
                                    {selectedTechs.length === 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-2 h-2 bg-cyan-300 rounded-full"
                                        />
                                    )}
                                    <span>Todos</span>
                                </span>
                            </motion.button>

                            {/* Technology buttons */}
                            {techList.map((tech, i) => (
                                <motion.button
                                    key={tech}
                                    custom={i + 1}
                                    variants={techVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover={{ scale: 1.08, y: -4 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => toggleTech(tech)}
                                    onHoverStart={() => setHoveredTech(tech)}
                                    onHoverEnd={() => setHoveredTech(null)}
                                    className={`relative px-5 py-2.5 rounded-full backdrop-blur-md border transition-all text-sm font-medium z-10 cursor-pointer ${selectedTechs.includes(tech)
                                        ? "bg-cyan-500/30 border-cyan-400/50 text-cyan-200 shadow-lg shadow-cyan-500/20"
                                        : "bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40 text-gray-300"
                                        }`}
                                >
                                    {/* Animated background on hover */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full pointer-events-none"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ originX: 0 }}
                                    />
                                    <span className="relative z-20 flex items-center gap-2">
                                        {selectedTechs.includes(tech) && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-2 h-2 bg-cyan-300 rounded-full"
                                            />
                                        )}
                                        <span>{tech}</span>
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}
