"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

export function ContactHero() {
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        // Evitar que la página se apague en dispositivos móviles
        const preventSleep = () => {
            if ('wakeLock' in navigator) {
                navigator.wakeLock.request('screen').catch(() => { });
            }
        };

        preventSleep();

        // Mantener la página activa
        const events = ['mousemove', 'touchstart', 'keydown', 'scroll'];
        const keepAlive = () => {
            if (document.visibilityState === 'visible') {
                preventSleep();
            }
        };

        events.forEach(event => window.addEventListener(event, keepAlive));
        document.addEventListener('visibilitychange', keepAlive);

        return () => {
            events.forEach(event => window.removeEventListener(event, keepAlive));
            document.removeEventListener('visibilitychange', keepAlive);
        };
    }, []);

    const containerVariants: Variants = {
        visible: {
            transition: {
                staggerChildren: 0.25,
                delayChildren: 0.4,
                ease: [0.83, 0, 0.17, 1]
            },
        },
    };

    const particleVariants = (i: number) => ({
        animate: {
            y: prefersReducedMotion ? [0] : [0, -200 + Math.random() * -100],
            x: prefersReducedMotion ? [0] : [0, Math.random() * 80 - 40],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
            rotate: [0, 360],
            transition: {
                duration: prefersReducedMotion ? 0 : 16 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
            }
        }
    });

    const iconVariants = {
        rest: { scale: 1, rotate: 0 },
        hover: {
            scale: 1.15,
            rotate: 360,
            transition: {
                duration: 0.8,
                ease: "easeInOut"
            }
        },
        float: (i: number) => ({
            y: prefersReducedMotion ? [0] : [0, -15, 0, 15, 0],
            rotate: [0, 5, 0, -5, 0],
            transition: {
                duration: prefersReducedMotion ? 0 : 5.5 + i,
                repeat: Infinity,
                ease: "easeInOut"
            }
        })
    };

    // Configuración para evitar que se apague la pantalla
    const preventScreenOff = () => {
        if ('wakeLock' in navigator) {
            navigator.wakeLock.request('screen').catch(() => { });
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="visible"
            animate="visible"
            onMouseMove={preventScreenOff}
            onTouchStart={preventScreenOff}
            className="relative overflow-hidden w-screen h-screen flex items-center justify-center p-0 m-0"
            style={{
                width: '100vw',
                height: '100vh',
                maxWidth: '100%',
                position: 'relative'
            }}
        >
            {/* Gradient Background - Ocupa toda la pantalla */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    width: '100vw',
                    height: '100vh',
                    background: "#000000"
                }}
            />

            {/* Mesh Gradient - Ocupa toda la pantalla */}
            <div className="absolute inset-0 w-full h-full">
                <div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.05) 0%, transparent 50%),
                                         radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.03) 0%, transparent 50%),
                                         radial-gradient(circle at 40% 80%, rgba(14, 165, 233, 0.03) 0%, transparent 50%)`,
                        width: '100vw',
                        height: '100vh'
                    }}
                />
            </div>

            {/* Orbs - Expandidos para cubrir toda la pantalla */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`absolute rounded-full blur-[80px] sm:blur-[100px] ${i === 0 ? "w-[60vw] h-[60vw] -top-1/3 -left-1/4 bg-gradient-to-r from-cyan-500/20 to-blue-500/10 sm:w-[90vw] sm:h-[90vw] sm:-top-1/4 lg:w-[800px] lg:h-[800px]" :
                            i === 1 ? "w-[70vw] h-[70vw] -bottom-1/3 -right-1/4 bg-gradient-to-l from-purple-500/20 to-pink-500/10 sm:w-[80vw] sm:h-[80vw] sm:-bottom-1/4 lg:w-[600px] lg:h-[600px]" :
                                "w-[50vw] h-[50vw] top-1/2 left-1/3 bg-gradient-to-br from-blue-500/15 to-cyan-500/10 sm:w-[70vw] sm:h-[70vw] lg:w-[400px] lg:h-[400px]"
                            }`}
                        style={{
                            minWidth: i === 0 ? '60vw' : i === 1 ? '70vw' : '50vw',
                            minHeight: i === 0 ? '60vw' : i === 1 ? '70vw' : '50vw'
                        }}
                    />
                ))}
            </div>

            {/* Quantum Particles - Distribuidos en toda la pantalla */}
            <div className="absolute inset-0 w-full h-full">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        variants={particleVariants(i) as any}
                        animate="animate"
                        className="absolute rounded-full"
                        style={{
                            left: `${Math.random() * 100}vw`,
                            top: `${Math.random() * 100}vh`,
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            background: i % 3 === 0 ? "rgba(56, 189, 248, 0.8)" :
                                i % 3 === 1 ? "rgba(168, 85, 247, 0.8)" :
                                    "rgba(14, 165, 233, 0.8)"
                        }}
                    />
                ))}
            </div>

            {/* Grid with 3D Perspective - Expandido */}
            <div
                className="absolute inset-0 hidden sm:block"
                style={{
                    backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
                                     linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                    transform: 'perspective(500px) rotateX(60deg)',
                    transformOrigin: 'center',
                    width: '100vw',
                    height: '100vh'
                }}
            />

            {/* Main Content - Centrado y responsive */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8">
                <div className="text-center max-w-2xl xs:max-w-3xl sm:max-w-5xl w-full mx-auto">
                    {/* Shimmer Border - Expandido */}
                    <div
                        className="absolute -inset-[1px] sm:-inset-[2px] rounded-2xl sm:rounded-3xl bg-gradient-to-r from-transparent via-cyan-500/30 via-purple-500/30 via-transparent opacity-20 sm:opacity-30"
                        style={{
                            width: 'calc(100% + 4px)',
                            height: 'calc(100% + 4px)'
                        }}
                    />

                    {/* Title Container */}
                    <div
                        className="relative p-4 sm:p-6 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 w-full max-w-2xl sm:max-w-4xl lg:max-w-6xl mx-auto"
                        onMouseEnter={preventScreenOff}
                    >
                        <h1
                            className="mb-2 sm:mb-4 md:mb-6 font-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter px-1 sm:px-2"
                        >
                            <span
                                className="block bg-gradient-to-r from-cyan-200 via-white to-blue-200 bg-clip-text text-transparent"
                                style={{
                                    backgroundImage: 'linear-gradient(90deg, #67e8f9, #f8fafc, #93c5fd, #67e8f9)'
                                }}
                            >
                                CONTACTAME
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p
                            className="mx-auto max-w-2xl sm:max-w-3xl lg:max-w-4xl text-xs xs:text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl font-light leading-relaxed px-1 sm:px-2 md:px-4"
                        >
                            <span
                                className="text-gray-300"
                            >
                                ¿Tienes un proyecto en mente?
                            </span>
                            <br />
                            <span
                                className="inline-block mt-1 sm:mt-2 md:mt-4 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent font-medium text-xs xs:text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl"
                            >
                                Hagamos algo increíble juntos
                            </span>
                        </p>

                        {/* Interactive Icons with Physics-like Animation */}
                        <motion.div
                            variants={containerVariants}
                            className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mt-4 sm:mt-6 md:mt-8 lg:mt-12 px-1 sm:px-2"
                        >
                            {[
                                {
                                    label: "React",
                                    svg: (
                                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                            <circle cx="12" cy="12" r="2" className="text-cyan-400" />
                                            <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="1.5" />
                                            <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="1.5" transform="rotate(60 12 12)" />
                                            <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="1.5" transform="rotate(120 12 12)" />
                                        </svg>
                                    ),
                                    color: "from-cyan-200/20 to-cyan-400/30"
                                },
                                {
                                    label: "Next.js",
                                    svg: (
                                        <Image
                                            src="/nextjs-icon.webp"
                                            alt="Next.js"
                                            width={32}
                                            height={32}
                                            className="w-8 h-8 object-contain"
                                        />
                                    ),
                                    color: "from-gray-200/20 to-gray-400/30"
                                },
                                {
                                    label: "TypeScript",
                                    svg: (
                                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                            <rect x="2" y="2" width="20" height="20" rx="2" className="text-blue-400" fill="currentColor" />
                                            <text x="12" y="17" fontSize="11" fontWeight="bold" textAnchor="middle" fill="white">TS</text>
                                        </svg>
                                    ),
                                    color: "from-blue-200/20 to-blue-400/30"
                                },
                                {
                                    label: "Node.js",
                                    svg: (
                                        <Image
                                            src="/919825.png"
                                            alt="Node.js"
                                            width={32}
                                            height={32}
                                            className="w-8 h-8 object-contain"
                                        />
                                    ),
                                    color: "from-green-200/20 to-green-400/30"
                                },
                                {
                                    label: "PostgreSQL",
                                    svg: (
                                        <Image
                                            src="/postgre.png"
                                            alt="PostgreSQL"
                                            width={32}
                                            height={32}
                                            className="w-8 h-8 object-contain"
                                        />
                                    ),
                                    color: "from-orange-200/20 to-orange-400/30"
                                },
                                {
                                    label: "JavaScript",
                                    svg: (
                                        <svg className="w-8 h-8 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                                            <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" opacity="0.2" />
                                            <text x="12" y="16" fontSize="10" fontWeight="bold" textAnchor="middle" fill="currentColor">JS</text>
                                        </svg>
                                    ),
                                    color: "from-yellow-200/20 to-yellow-400/30"
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    custom={i}
                                    variants={iconVariants as any}
                                    animate="float"
                                    whileHover="hover"
                                    initial="rest"
                                    whileTap={{ scale: 0.9 }}
                                    onTapStart={preventScreenOff}
                                    className={`w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl md:rounded-2xl backdrop-blur-lg bg-gradient-to-br ${item.color} border border-white/20 flex items-center justify-center cursor-pointer shadow-2xl transition-all duration-300 hover:border-cyan-400/40 group`}
                                    title={item.label}
                                >
                                    {item.svg}
                                    <div className="absolute -bottom-6 xs:-bottom-7 sm:-bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs whitespace-nowrap pointer-events-none">
                                        {item.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA Indicator */}
                        <div
                            className="mt-4 sm:mt-6 md:mt-8 lg:mt-12 px-1 sm:px-2"
                        >
                            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300 cursor-pointer"
                                onClick={preventScreenOff}>
                                <div
                                    className="w-2 h-2 rounded-full bg-cyan-400"
                                />
                                <span className="text-xs sm:text-sm md:text-base font-medium text-cyan-200">
                                    Disponible para nuevos proyectos
                                </span>
                                <div
                                    className="text-cyan-300/60"
                                >
                                    ↗
                                </div>
                            </div>
                        </div>

                        {/* Energy Ring */}
                        <div
                            className="absolute -z-10 -inset-4 rounded-3xl pointer-events-none"
                            style={{
                                background: "radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%)"
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Ambient Light Effects */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, transparent 70%)",
                    width: 'min(150vh, 150vw)',
                    height: 'min(150vh, 150vw)',
                    borderRadius: '50%'
                }}
            />

            {/* Floating Interaction Hint */}
            <div
                className="absolute bottom-4 xs:bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden xs:flex items-center gap-1 xs:gap-2 text-white/40 text-xs xs:text-sm"
            >
                <span>Interactúa con los elementos</span>
                <div>\n                    →\n                </div>\n            </div>
        </motion.div>
    );
}