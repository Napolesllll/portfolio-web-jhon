"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Mail, Github, Linkedin, ExternalLink, Send } from "lucide-react";

export function AboutContact() {
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.4,
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

    const contactButtons = [
        {
            id: "email",
            icon: Mail,
            label: "Email",
            value: "canojhon148@gmail.com",
            href: "mailto:canojhon148@gmail.com",
            color: "from-red-500 to-pink-500",
        },
        {
            id: "github",
            icon: Github,
            label: "GitHub",
            value: "github.com/jhoncano",
            href: "https://github.com/jhoncano",
            color: "from-gray-600 to-gray-800",
        },
        {
            id: "linkedin",
            icon: Linkedin,
            label: "LinkedIn",
            value: "linkedin.com/in/jhoncano",
            href: "https://linkedin.com/in/jhoncano",
            color: "from-blue-600 to-blue-800",
        },
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
    };

    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative py-20"
        >
            {/* Background Elements */}
            <motion.div
                className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"
                animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"
                animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
            />

            <motion.div variants={itemVariants} className="text-center space-y-4 mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold text-white">
                    ¿Hablamos?
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Siempre estoy abierto a nuevas oportunidades y colaboraciones. Contáctame
                    y empecemos a crear algo extraordinario juntos.
                </p>
            </motion.div>

            {/* Contact Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {contactButtons.map((button) => (
                    <motion.a
                        key={button.id}
                        href={button.href}
                        target={button.href.startsWith("http") ? "_blank" : undefined}
                        rel={button.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        variants={itemVariants}
                        onMouseEnter={() => setHoveredButton(button.id)}
                        onMouseLeave={() => setHoveredButton(null)}
                        whileHover={{ scale: 1.05, y: -10 }}
                        className="group relative"
                    >
                        <div
                            className={`absolute -inset-0.5 bg-gradient-to-r ${button.color} rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                        />

                        <motion.div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-8 hover:border-white/30 transition-all duration-300 h-full flex flex-col items-center text-center">
                            <motion.div
                                animate={
                                    hoveredButton === button.id
                                        ? { scale: 1.2, rotate: 360 }
                                        : { scale: 1, rotate: 0 }
                                }
                                transition={{ duration: 0.5 }}
                            >
                                <button.icon
                                    className={`w-12 h-12 mb-4 text-transparent bg-gradient-to-r ${button.color} bg-clip-text`}
                                />
                            </motion.div>

                            <h3 className="text-xl font-bold text-white mb-2">
                                {button.label}
                            </h3>
                            <p className="text-sm text-gray-400 break-all">
                                {button.value}
                            </p>

                            {button.href.startsWith("http") && (
                                <motion.div
                                    animate={
                                        hoveredButton === button.id ? { x: 5, opacity: 1 } : { x: 0, opacity: 0 }
                                    }
                                    className="mt-4"
                                >
                                    <ExternalLink className="w-5 h-5 text-cyan-400" />
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.a>
                ))}
            </div>

            {/* Quick Contact Form */}
            <motion.div variants={itemVariants} className="relative max-w-2xl mx-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-0 hover:opacity-20 transition-opacity duration-500" />

                <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <motion.div whileHover={{ y: -2 }}>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    placeholder="Tu nombre"
                                    required
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                                />
                            </motion.div>
                            <motion.div whileHover={{ y: -2 }}>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="tu@email.com"
                                    required
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                                />
                            </motion.div>
                        </div>

                        <motion.div whileHover={{ y: -2 }}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Mensaje
                            </label>
                            <textarea
                                placeholder="Tu mensaje aquí..."
                                required
                                rows={4}
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all resize-none"
                            />
                        </motion.div>

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full relative group overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50"
                        >
                            <div className="absolute -inset-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <motion.span
                                className="relative flex items-center justify-center gap-2"
                                animate={isSubmitting ? { opacity: [1, 0.5, 1] } : {}}
                                transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        Enviar Mensaje
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </motion.span>
                        </motion.button>
                    </form>
                </div>
            </motion.div>

            {/* Footer CTA */}
            <motion.div
                variants={itemVariants}
                className="mt-16 text-center space-y-4"
            >
                <p className="text-gray-400">
                    O simplemente comparte este portafolio con alguien que pueda necesitar un
                    developer como yo 🚀
                </p>
                <div className="flex justify-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigator.share?.({ url: window.location.href })}
                        className="px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
                    >
                        Compartir
                    </motion.button>
                </div>
            </motion.div>
        </motion.section>
    );
}
