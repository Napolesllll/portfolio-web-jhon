"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { MapPin, Lightbulb, Target, Heart } from "lucide-react";

export function AboutBio() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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

    const cardVariants: Variants = {
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

    const bioCards = [
        {
            icon: Lightbulb,
            title: "Innovador",
            description: "Siempre buscando nuevas formas de resolver problemas y crear soluciones originales.",
            color: "from-yellow-500 to-orange-500",
        },
        {
            icon: Target,
            title: "Enfocado",
            description: "Dedicado a escribir código limpio, escalable y con excelente performance.",
            color: "from-blue-500 to-cyan-500",
        },
        {
            icon: Heart,
            title: "Apasionado",
            description: "Me encanta lo que hago y disfruto compartiendo conocimiento con otros desarrolladores.",
            color: "from-red-500 to-pink-500",
        },
    ];

    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative py-20 space-y-12"
        >
            {/* Main Bio Card */}
            <motion.div
                variants={cardVariants}
                className="relative group"
            >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 hover:border-cyan-500/30 transition-all duration-300">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                        {/* Avatar Container */}
                        <motion.div
                            whileHover={{ scale: 1.05, rotateZ: 5 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-xl opacity-30" />
                            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-6xl font-bold text-white overflow-hidden">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    JC
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Bio Text */}
                        <div className="md:col-span-2 space-y-4">
                            <div className="flex items-center gap-2 text-cyan-400 mb-4">
                                <MapPin className="w-5 h-5" />
                                <span>Medellín, Colombia</span>
                            </div>

                            <h2 className="text-4xl font-bold text-white">
                                Jhon Cano
                            </h2>

                            <div className="space-y-3 text-gray-300 leading-relaxed">
                                <p>
                                    👋 Soy un Full Stack Developer apasionado por crear experiencias web que no solo
                                    funcionan bien, sino que inspiran. Con más de 4 años transformando ideas complejas
                                    en soluciones digitales elegantes.
                                </p>
                                <p>
                                    💻 Mi especialidad está en construir aplicaciones modernas con <span className="text-cyan-400 font-semibold">React</span>,
                                    <span className="text-blue-400 font-semibold"> Next.js</span> y <span className="text-purple-400 font-semibold">TypeScript</span>,
                                    combinadas con backends robustos usando <span className="text-green-400 font-semibold">Node.js</span> y
                                    <span className="text-orange-400 font-semibold"> PostgreSQL</span>.
                                </p>
                                <p>
                                    🚀 Creo en el poder del código limpio, la escalabilidad y el rendimiento. Cada línea que escribo
                                    es pensada para ser mantenible, eficiente y memorable.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Core Values */}
            <div className="grid md:grid-cols-3 gap-6">
                {bioCards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        variants={cardVariants}
                        onMouseEnter={() => setHoveredCard(idx)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className="group relative"
                    >
                        <div className={`absolute -inset-0.5 bg-gradient-to-r ${card.color} rounded-xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />

                        <motion.div
                            whileHover={{ y: -5, rotate: 2 }}
                            className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300"
                        >
                            <motion.div
                                animate={{ rotate: hoveredCard === idx ? 360 : 0 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                            >
                                <card.icon className={`w-10 h-10 mb-4 text-transparent bg-gradient-to-r ${card.color} bg-clip-text`} />
                            </motion.div>

                            <h3 className="text-xl font-bold text-white mb-2">
                                {card.title}
                            </h3>
                            <p className="text-gray-400">
                                {card.description}
                            </p>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
