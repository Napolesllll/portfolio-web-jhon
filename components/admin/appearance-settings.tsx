"use client";

import { motion, Variants } from "framer-motion";
import { Palette, Sun, Moon, Monitor } from "lucide-react";
import { useState } from "react";

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
    },
};

export function AppearanceSettings() {
    const [theme, setTheme] = useState<"light" | "dark" | "auto">("dark");

    const themes = [
        { id: "light", label: "Claro", icon: Sun, description: "Modo claro con fondo blanco" },
        { id: "dark", label: "Oscuro", icon: Moon, description: "Modo oscuro con fondo negro" },
        { id: "auto", label: "Automático", icon: Monitor, description: "Sigue la preferencia del sistema" },
    ];

    return (
        <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl p-8 hover:border-white/20 transition-all"
        >
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-white/10">
                    <Palette className="w-6 h-6 text-amber-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Apariencia</h2>
            </div>

            <div className="space-y-4 mb-6">
                <p className="text-sm text-gray-400">Selecciona tu tema preferido</p>
                <div className="grid gap-3 sm:grid-cols-3">
                    {themes.map((t) => {
                        const Icon = t.icon;
                        const isSelected = theme === t.id;
                        return (
                            <motion.button
                                key={t.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setTheme(t.id as "light" | "dark" | "auto")}
                                className={`relative group p-4 rounded-xl border-2 transition-all ${isSelected
                                        ? "border-cyan-400 bg-cyan-500/10"
                                        : "border-white/10 bg-slate-900/50 hover:border-white/20"
                                    }`}
                            >
                                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                                <div className="relative">
                                    <motion.div
                                        animate={isSelected ? { rotate: 360 } : { rotate: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="mb-2"
                                    >
                                        <Icon className={`w-6 h-6 mx-auto ${isSelected ? "text-cyan-400" : "text-gray-400"}`} />
                                    </motion.div>
                                    <p className={`font-semibold mb-1 ${isSelected ? "text-cyan-400" : "text-white"}`}>
                                        {t.label}
                                    </p>
                                    <p className="text-xs text-gray-400">{t.description}</p>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            <motion.div className="p-4 rounded-lg bg-purple-500/10 border border-purple-400/30">
                <p className="text-sm text-purple-300">
                    ✨ Los cambios se guardan automáticamente en tu navegador.
                </p>
            </motion.div>
        </motion.div>
    );
}
