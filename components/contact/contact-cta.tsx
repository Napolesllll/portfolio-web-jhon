"use client";

import { motion, Variants } from "framer-motion";
import { Video, Send } from "lucide-react";

export function ContactCTA() {
    const variants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
        },
    };

    const hoverVariants: Variants = {
        hover: { scale: 1.05, transition: { duration: 0.3 } },
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative group overflow-hidden rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 p-6 backdrop-blur-md"
        >
            {/* Background Animation */}
            <div className="absolute inset-0 -z-10">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-pink-500/0"
                    animate={{
                        x: [-1000, 1000],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>

            <div className="relative">
                <div className="flex items-start gap-3 mb-3">
                    <Video className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="font-bold text-white">¿Prefieres agendar una llamada?</h3>
                        <p className="text-sm text-gray-300 mt-1">
                            Podemos coordinar una videollamada para discutir tu proyecto en detalle.
                        </p>
                    </div>
                </div>

                <motion.a
                    href="https://cal.com/jhoncano"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover="hover"
                    variants={hoverVariants}
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                >
                    Agendar reunión
                    <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <Send className="h-4 w-4" />
                    </motion.span>
                </motion.a>
            </div>
        </motion.div>
    );
}
