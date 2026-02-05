"use client";

import { motion, Variants } from "framer-motion";
import { User, Mail, Shield, Zap } from "lucide-react";

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
    },
};

interface ProfileInfoProps {
    name?: string | null;
    email?: string | null;
    role?: string | null;
}

export function ProfileInfo({ name, email, role }: ProfileInfoProps) {
    const profileFields = [
        { icon: User, label: "Nombre", value: name, color: "from-blue-500/20 to-blue-600/20", textColor: "text-blue-400" },
        { icon: Mail, label: "Email", value: email, color: "from-cyan-500/20 to-cyan-600/20", textColor: "text-cyan-400" },
        { icon: Shield, label: "Rol", value: role, color: "from-purple-500/20 to-purple-600/20", textColor: "text-purple-400", isBadge: true },
    ];

    return (
        <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl p-8 hover:border-white/20 transition-all"
        >
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-white/10">
                    <User className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Perfil</h2>
            </div>

            <div className="grid gap-6">
                {profileFields.map((field) => {
                    const Icon = field.icon;
                    return (
                        <motion.div
                            key={field.label}
                            whileHover={{ x: 8 }}
                            className="group relative"
                        >
                            <div className={`absolute -inset-2 bg-gradient-to-r ${field.color} rounded-lg blur opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />
                            <div className="relative rounded-lg bg-slate-900/50 border border-white/10 p-4 group-hover:border-white/20 transition-all">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <label className="text-sm text-gray-400 mb-2 block">{field.label}</label>
                                        {field.isBadge ? (
                                            <motion.span
                                                whileHover={{ scale: 1.05 }}
                                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${field.color} border border-white/10 text-sm font-medium ${field.textColor}`}
                                            >
                                                <Zap className="w-3 h-3" />
                                                {field.value}
                                            </motion.span>
                                        ) : (
                                            <p className="font-semibold text-white">{field.value || "No especificado"}</p>
                                        )}
                                    </div>
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className={`p-2 rounded-lg bg-gradient-to-br ${field.color} border border-white/10`}
                                    >
                                        <Icon className={`w-5 h-5 ${field.textColor}`} />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
