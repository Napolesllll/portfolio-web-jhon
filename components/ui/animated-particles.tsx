"use client";

import { motion, Variants } from "framer-motion";
import { useMemo } from "react";

interface Particle {
    id: number;
    size: number;
    duration: number;
    delay: number;
    startX: number;
    startY: number;
    angle: number;
    color: string;
}

const generateParticles = (count: number): Particle[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 8 + 2,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 2,
        startX: Math.random() * 100,
        startY: Math.random() * 100,
        angle: Math.random() * 360,
        color: ["rgba(34, 211, 238, ", "rgba(59, 130, 246, ", "rgba(168, 85, 247, "][
            Math.floor(Math.random() * 3)
        ],
    }));
};

export function AnimatedParticles() {
    const particles = useMemo(() => generateParticles(40), []);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => {
                const endX = Math.cos((particle.angle * Math.PI) / 180) * 200;
                const endY = Math.sin((particle.angle * Math.PI) / 180) * 200;

                return (
                    <motion.div
                        key={particle.id}
                        initial={{
                            left: `${particle.startX}%`,
                            top: `${particle.startY}%`,
                            opacity: 0,
                            scale: 0,
                        }}
                        animate={{
                            left: `calc(${particle.startX}% + ${endX}px)`,
                            top: `calc(${particle.startY}% + ${endY}px)`,
                            opacity: [0, 0.8, 0.4, 0],
                            scale: [0, 1, 0.5, 0],
                        }}
                        transition={{
                            duration: particle.duration,
                            delay: particle.delay,
                            repeat: Infinity,
                            ease: "easeOut",
                        }}
                        className="absolute pointer-events-none"
                        style={{
                            width: particle.size,
                            height: particle.size,
                            background: `${particle.color}0.6)`,
                            borderRadius: "50%",
                            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}0.8)`,
                            willChange: "transform, opacity",
                        }}
                    />
                );
            })}
        </div>
    );
}
