"use client";

import { motion, Variants } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState } from "react";

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
    },
};

export function SecuritySettings() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl p-8 hover:border-white/20 transition-all"
        >
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 border border-white/10">
                    <Lock className="w-6 h-6 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Seguridad</h2>
            </div>

            <div className="space-y-4">
                <motion.div
                    whileHover={{ x: 8 }}
                    className="group relative"
                >
                    <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-lg blur opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                    <div className="relative rounded-lg bg-slate-900/50 border border-white/10 p-4 group-hover:border-white/20 transition-all cursor-pointer">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="font-semibold text-white mb-1">Cambiar Contraseña</p>
                                <p className="text-sm text-gray-400">Actualiza tu contraseña regularmente para mantener tu cuenta segura</p>
                            </div>
                            <motion.div
                                whileHover={{ x: 4 }}
                                className="p-2 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/20 border border-white/10"
                            >
                                <ArrowRight className="w-5 h-5 text-red-400" />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ x: 8 }}
                    className="group relative"
                >
                    <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg blur opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                    <div className="relative rounded-lg bg-slate-900/50 border border-white/10 p-4 group-hover:border-white/20 transition-all">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="font-semibold text-white mb-1">Sesiones Activas</p>
                                <p className="text-sm text-gray-400">Administra tus dispositivos conectados</p>
                            </div>
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-white/10"
                            >
                                <Lock className="w-5 h-5 text-orange-400" />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-400/30">
                <p className="text-sm text-blue-300">
                    💡 Consejo: Usa contraseñas fuertes con combinación de letras, números y caracteres especiales.
                </p>
            </motion.div>
        </motion.div>
    );
}
