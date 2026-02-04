"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.div
            className="fixed left-0 right-0 top-16 z-50 h-1 origin-left bg-gradient-to-r from-primary to-accent"
            style={{
                scaleX,
                opacity: isVisible ? 1 : 0,
            }}
            transition={{ opacity: { duration: 0.2 } }}
        />
    );
}