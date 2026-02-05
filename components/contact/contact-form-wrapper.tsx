"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface ContactFormWrapperProps {
    children: ReactNode;
}

export function ContactFormWrapper({ children }: ContactFormWrapperProps) {
    const variants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
        },
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative group"
        >
            {/* Background Gradient */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 -z-10" />

            {/* Card */}
            <div className="relative rounded-xl border border-white/10 bg-slate-950/80 backdrop-blur-md p-8 space-y-6">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        Envíame un Mensaje
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">
                        Responderé en el menor tiempo posible
                    </p>
                </div>

                {children}
            </div>
        </motion.div>
    );
}
