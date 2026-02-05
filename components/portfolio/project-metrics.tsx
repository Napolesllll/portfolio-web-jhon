"use client";

import { motion, Variants } from "framer-motion";
import { BarChart3, Zap, Target } from "lucide-react";

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

const metricVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
        },
    },
};

interface ProjectMetricsProps {
    metrics?: Record<string, string>;
}

export function ProjectMetrics({ metrics }: ProjectMetricsProps) {
    if (!metrics || Object.keys(metrics).length === 0) return null;

    const iconMap: Record<string, React.ReactNode> = {
        Performance: <Zap className="w-6 h-6" />,
        Usuarios: <Target className="w-6 h-6" />,
        Desempeño: <BarChart3 className="w-6 h-6" />,
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
                <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-emerald-400" />
                <div>
                    <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text">
                        Métricas y Resultados
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">
                        Impacto y logros alcanzados con este proyecto
                    </p>
                </div>
            </motion.div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(metrics).map(([key, value], i) => {
                    const Icon = iconMap[key];

                    return (
                        <motion.div
                            key={key}
                            custom={i}
                            variants={metricVariants}
                            whileHover={{ scale: 1.05, y: -4 }}
                        >
                            <div className="relative h-full rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-8 hover:border-cyan-400/50 hover:bg-white/15 transition-all group">
                                {/* Background Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Content */}
                                <div className="relative space-y-4">
                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                                        {Icon || <BarChart3 className="w-6 h-6" />}
                                    </div>

                                    {/* Label */}
                                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                        {key}
                                    </p>

                                    {/* Value */}
                                    <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
                                        {value}
                                    </p>
                                </div>

                                {/* Border Animation */}
                                <div className="absolute inset-0 rounded-xl border border-cyan-400/0 group-hover:border-cyan-400/50 transition-all pointer-events-none" />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
