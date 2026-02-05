"use client";

import { motion, Variants } from "framer-motion";
import { Settings, Sparkles } from "lucide-react";

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

export function SettingsHeader() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative mb-12 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 border border-white/10"
        >
            {/* Background Orbs */}
            <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-0 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -z-10"
                animate={{ scale: [1.2, 1, 1.2] }}
                transition={{ duration: 10, repeat: Infinity }}
            />

            <motion.div variants={itemVariants} className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10"
                        >
                            <Settings className="w-6 h-6 text-cyan-400" />
                        </motion.div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Configuración
                            </h1>
                        </div>
                    </div>
                    <motion.p variants={itemVariants} className="text-gray-300 max-w-xl">
                        Personaliza tu experiencia y administra los parámetros de tu cuenta.
                    </motion.p>
                </div>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <Sparkles className="w-8 h-8 text-purple-400" />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
