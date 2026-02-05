"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";

const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
        },
    },
};

interface TableOfContentsItem {
    id: string;
    text: string;
    level: number;
}

interface BlogTableOfContentsProps {
    items: TableOfContentsItem[];
}

export function BlogTableOfContents({ items }: BlogTableOfContentsProps) {
    const [isExpanded, setIsExpanded] = useState(true);

    if (items.length === 0) return null;

    const handleScrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="sticky top-8 mb-12 rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-md overflow-hidden"
        >
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-semibold text-white">Contenidos</h3>
                </div>
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-5 h-5 text-cyan-400" />
                </motion.div>
            </button>

            {/* Content */}
            <motion.div
                initial={false}
                animate={{ height: isExpanded ? "auto" : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-cyan-400/20"
            >
                <nav className="px-6 py-4 space-y-2 max-h-96 overflow-y-auto">
                    {items.map((item, i) => (
                        <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.3 }}
                            onClick={() => handleScrollToHeading(item.id)}
                            className="w-full text-left text-sm transition-colors hover:text-cyan-300 text-gray-400"
                            style={{
                                paddingLeft: `${(item.level - 2) * 16}px`,
                            }}
                        >
                            <span className="hover:text-cyan-400">{item.text}</span>
                        </motion.button>
                    ))}
                </nav>
            </motion.div>
        </motion.div>
    );
}
