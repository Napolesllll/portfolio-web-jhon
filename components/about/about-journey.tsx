"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";

interface JourneyItem {
    year: string;
    title: string;
    description: string;
    icon: string;
}

interface AboutJourneyProps {
    journey: JourneyItem[];
}

export function AboutJourney({ journey }: AboutJourneyProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.section
            id="journey"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative py-20 space-y-16"
        >
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

            <motion.div variants={itemVariants} className="text-center space-y-4">
                <h2 className="text-4xl sm:text-5xl font-bold text-white">
                    Mi Viaje en Desarrollo
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    5+ años de evolución y crecimiento constante en el mundo del desarrollo web
                </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
                {/* Vertical Line */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 -translate-x-1/2 origin-top"
                />

                {/* Timeline Items */}
                <div className="space-y-12 relative">
                    {journey.map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            onMouseEnter={() => setActiveIndex(idx)}
                            className={`relative transition-all duration-300 ${idx % 2 === 0 ? "md:pr-[52%]" : "md:pl-[52%]"
                                }`}
                        >
                            {/* Content Card */}
                            <motion.div
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: "0 20px 60px rgba(34, 197, 94, 0.2)",
                                }}
                                className="group relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

                                <div className="relative space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                transition={{ delay: idx * 0.1 + 0.2 }}
                                                className="text-3xl mb-2"
                                            >
                                                {item.icon}
                                            </motion.div>
                                            <h3 className="text-xl font-bold text-white">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <motion.span
                                            animate={
                                                activeIndex === idx
                                                    ? { scale: 1.1, boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)" }
                                                    : { scale: 1 }
                                            }
                                            className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold"
                                        >
                                            {item.year}
                                        </motion.span>
                                    </div>

                                    <p className="text-gray-400 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Center Dot */}
                            <motion.div
                                animate={
                                    activeIndex === idx
                                        ? {
                                            scale: 1.5,
                                            boxShadow: [
                                                "0 0 0 0 rgba(6, 182, 212, 0.7)",
                                                "0 0 0 10px rgba(6, 182, 212, 0)",
                                            ],
                                            transition: { duration: 1, repeat: Infinity },
                                        }
                                        : { scale: 1 }
                                }
                                className="absolute left-1/2 top-8 w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full -translate-x-1/2 border-4 border-background z-10"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom gradient */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-center mt-12"
            >
                <p className="text-gray-400 italic">
                    Y la historia continúa... cada día aprendiendo algo nuevo 🚀
                </p>
            </motion.div>
        </motion.section>
    );
}
