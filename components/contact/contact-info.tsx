"use client";

import { motion, Variants } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactInfoProps {
    email: string;
    phone: string;
    location: string;
}

export function ContactInfo({ email, phone, location }: ContactInfoProps) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8 },
        },
    };

    const contactMethods = [
        {
            icon: Mail,
            label: "Email",
            value: email,
            href: `mailto:${email}`,
        },
        {
            icon: Phone,
            label: "Teléfono",
            value: phone,
            href: `tel:${phone.replace(/\s+/g, "")}`,
        },
        {
            icon: MapPin,
            label: "Ubicación",
            value: location,
            href: "#",
            isLocation: true,
        },
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
        >
            <h2 className="text-2xl font-bold">Información de Contacto</h2>

            {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                    <motion.div
                        key={method.label}
                        variants={itemVariants}
                        className="group flex items-start gap-4 p-4 rounded-xl border border-white/10 hover:border-cyan-400/50 bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 group-hover:border-cyan-400/60 transition-colors">
                            <Icon className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="mb-1 font-semibold text-white">{method.label}</h3>
                            {method.isLocation ? (
                                <p className="text-gray-300">{method.value}</p>
                            ) : (
                                <a
                                    href={method.href}
                                    className="text-gray-300 hover:text-cyan-400 transition-colors group-hover:underline"
                                >
                                    {method.value}
                                </a>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
