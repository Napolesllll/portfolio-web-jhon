"use client";

import { motion, Variants } from "framer-motion";
import { Clock } from "lucide-react";

interface AvailabilitySlot {
    day: string;
    hours: string;
}

const availability: AvailabilitySlot[] = [
    { day: "Lunes - Viernes", hours: "9:00 AM - 6:00 PM" },
    { day: "Sábados", hours: "10:00 AM - 2:00 PM" },
    { day: "Domingos", hours: "Cerrado" },
];

export function ContactAvailability() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-6 rounded-xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 backdrop-blur-md"
        >
            <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white">Disponibilidad</h3>
            </div>

            <motion.div variants={containerVariants} className="space-y-3">
                {availability.map((slot, index) => (
                    <motion.div
                        key={slot.day}
                        variants={itemVariants}
                        className="flex justify-between items-center text-sm"
                    >
                        <span className="text-gray-300">{slot.day}</span>
                        <span className={`font-medium ${slot.hours === "Cerrado"
                                ? "text-red-400"
                                : "text-emerald-400"
                            }`}>
                            {slot.hours}
                        </span>
                    </motion.div>
                ))}
            </motion.div>

            <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-gray-400">
                    Zona horaria: <span className="text-gray-300">COT (GMT-5)</span>
                </p>
            </div>
        </motion.div>
    );
}
