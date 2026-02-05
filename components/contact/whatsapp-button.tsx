"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
    return (
        <motion.a
            href="https://wa.me/573023376544"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-40 p-4 bg-green-500 hover:bg-green-600 rounded-full shadow-lg text-white transition-colors duration-300"
            aria-label="WhatsApp"
        >
            <MessageCircle className="w-6 h-6" />
        </motion.a>
    );
}
