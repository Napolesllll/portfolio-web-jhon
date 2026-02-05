"use client";

import { motion, Variants } from "framer-motion";
import { Bell, Mail, MessageSquare, Zap } from "lucide-react";
import { useState } from "react";

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
    },
};

interface NotificationSetting {
    id: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    enabled: boolean;
}

export function NotificationSettings() {
    const [notifications, setNotifications] = useState<NotificationSetting[]>([
        {
            id: "email",
            label: "Notificaciones por Email",
            description: "Recibe alertas sobre comentarios y nuevas respuestas",
            icon: <Mail className="w-5 h-5" />,
            enabled: true,
        },
        {
            id: "comments",
            label: "Nuevos Comentarios",
            description: "Sé notificado cuando alguien comente en tus posts",
            icon: <MessageSquare className="w-5 h-5" />,
            enabled: true,
        },
        {
            id: "updates",
            label: "Actualizaciones del Sistema",
            description: "Recibe notificaciones sobre cambios importantes",
            icon: <Zap className="w-5 h-5" />,
            enabled: false,
        },
    ]);

    const toggleNotification = (id: string) => {
        setNotifications(
            notifications.map((n) =>
                n.id === id ? { ...n, enabled: !n.enabled } : n
            )
        );
    };

    return (
        <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl p-8 hover:border-white/20 transition-all"
        >
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 border border-white/10">
                    <Bell className="w-6 h-6 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Notificaciones</h2>
            </div>

            <div className="space-y-4">
                {notifications.map((notif, index) => (
                    <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ x: 8 }}
                        className="group relative"
                    >
                        <div className={`absolute -inset-2 bg-gradient-to-r ${notif.enabled ? "from-green-500/20 to-green-600/20" : "from-gray-500/20 to-gray-600/20"} rounded-lg blur opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />
                        <div className="relative rounded-lg bg-slate-900/50 border border-white/10 p-4 group-hover:border-white/20 transition-all">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4 flex-1">
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className={`p-2 rounded-lg border border-white/10 mt-1 ${notif.enabled ? "bg-gradient-to-br from-green-500/20 to-green-600/20 text-green-400" : "bg-gradient-to-br from-gray-500/20 to-gray-600/20 text-gray-400"}`}
                                    >
                                        {notif.icon}
                                    </motion.div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-white">{notif.label}</p>
                                        <p className="text-sm text-gray-400">{notif.description}</p>
                                    </div>
                                </div>

                                <motion.button
                                    onClick={() => toggleNotification(notif.id)}
                                    whileTap={{ scale: 0.95 }}
                                    className={`relative inline-flex h-8 w-14 items-center rounded-full border border-white/10 transition-all ${notif.enabled
                                            ? "bg-gradient-to-r from-green-500/20 to-green-600/20"
                                            : "bg-gradient-to-r from-gray-500/20 to-gray-600/20"
                                        }`}
                                >
                                    <motion.span
                                        initial={false}
                                        animate={{
                                            x: notif.enabled ? 28 : 4,
                                        }}
                                        className={`h-6 w-6 rounded-full transition-all ${notif.enabled
                                                ? "bg-gradient-to-r from-green-400 to-green-500"
                                                : "bg-gradient-to-r from-gray-400 to-gray-500"
                                            }`}
                                    />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-400/30">
                <p className="text-sm text-green-300">
                    🔔 Puedes cambiar estas preferencias en cualquier momento.
                </p>
            </motion.div>
        </motion.div>
    );
}
