'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

interface ShootingStar {
    id: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    duration: number;
    delay: number;
}

interface CosmicBackgroundProps {
    children?: React.ReactNode;
}

export function CosmicBackground({ children }: CosmicBackgroundProps) {
    const [stars, setStars] = useState<Star[]>([]);
    const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Generate random stars
        const generatedStars: Star[] = Array.from({ length: 80 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 1.5 + 0.5,
            duration: Math.random() * 2 + 2.5,
            delay: Math.random() * 5,
        }));

        setStars(generatedStars);

        // Generate initial shooting stars
        const generateShootingStar = (): ShootingStar => ({
            id: Math.random(),
            startX: Math.random() * 100,
            startY: Math.random() * 40, // Top 40% of screen
            endX: Math.random() * 40 - 20, // Move diagonally
            endY: Math.random() * 40 + 40, // To bottom-middle area
            duration: 1.5,
            delay: 0,
        });

        // Create initial shooting stars with staggered intervals
        const initialShootingStars = Array.from({ length: 2 }, () =>
            generateShootingStar()
        );
        setShootingStars(initialShootingStars);

        // Spawn new shooting stars every 4-8 seconds
        const shootingStarInterval = setInterval(() => {
            const newShootingStar = generateShootingStar();
            setShootingStars((prev) => {
                const updated = [...prev, newShootingStar];
                // Keep only last 3 shooting stars
                return updated.slice(-3);
            });
        }, Math.random() * 4000 + 4000);

        return () => clearInterval(shootingStarInterval);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
            {/* Main cosmic gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]" />

            {/* Nebula glow at bottom */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 2 }}
                className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent blur-3xl pointer-events-none"
            />

            {/* Twinkling stars */}
            <div className="absolute inset-0 pointer-events-none">
                {stars.map((star) => (
                    <motion.div
                        key={star.id}
                        className="absolute bg-white rounded-full"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            boxShadow: `0 0 ${star.size * 1.5}px rgba(255, 255, 255, 0.8)`,
                        }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            delay: star.delay,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Shooting stars */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {shootingStars.map((shootingStar) => (
                    <motion.div
                        key={shootingStar.id}
                        className="absolute w-1 h-1 bg-white rounded-full blur-sm"
                        style={{
                            left: `${shootingStar.startX}%`,
                            top: `${shootingStar.startY}%`,
                            boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.6)',
                        }}
                        animate={{
                            x: `${shootingStar.endX * 40}px`,
                            y: `${shootingStar.endY * 40}px`,
                            opacity: [1, 0],
                        }}
                        transition={{
                            duration: shootingStar.duration,
                            ease: 'easeIn',
                            delay: shootingStar.delay,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full h-full"
            >
                {children}
            </motion.div>
        </div>
    );
}
