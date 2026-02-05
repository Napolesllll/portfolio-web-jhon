"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedParticles } from "./animated-particles";
import { AnimatedOrbs } from "./animated-orbs";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Mostrar splash screen durante 3 segundos
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-950/95 to-slate-950 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Orbs */}
        <AnimatedOrbs />

        {/* Animated Particles */}
        <AnimatedParticles />

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Logo with epic glow effect */}
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          className="relative"
        >
          {/* Outer glow with gradient */}
          <motion.div
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-60 blur-3xl"
          />

          {/* Inner glow */}
          <motion.div
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            className="absolute inset-4 rounded-full bg-gradient-to-l from-purple-500 to-cyan-500 opacity-40 blur-2xl"
          />

          {/* Logo container with animated border */}
          <div className="relative h-36 w-36 flex items-center justify-center rounded-full bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-cyan-400/20 shadow-2xl shadow-cyan-500/20">
            {/* Rotating gradient border */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-30"
              style={{
                padding: "1px",
              }}
            />

            {/* Inner rotating border */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full border border-dashed border-blue-400/40"
            />

            {/* Logo image */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, type: "spring" }}
              className="relative h-28 w-28"
            >
              <Image
                src="/images/mylogo.png"
                alt="Logo"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>
          </div>

          {/* Floating particles around logo */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${(i * 360) / 4}deg) translateY(-80px)`,
                  background: `hsl(${180 + i * 40}, 100%, 50%)`,
                  opacity: 0.6,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Text with reveal animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight">
            <motion.span
              animate={{
                backgroundPosition: ["0%", "100%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto]"
            >
              Jhon Cano
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm text-gray-400 font-light tracking-widest uppercase"
          >
            Full Stack Developer
          </motion.p>
        </motion.div>

        {/* Enhanced progress bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "14rem", opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.4 }}
          className="h-1.5 rounded-full bg-gradient-to-r from-slate-800 to-slate-700 border border-cyan-400/20 overflow-hidden backdrop-blur-sm shadow-lg shadow-cyan-400/10 relative"
        >
          <motion.div
            animate={{
              x: ["0%", "300%"],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 to-transparent rounded-full shadow-lg shadow-cyan-400/50"
          />
        </motion.div>

        {/* Floating loading dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-3 mt-6"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -16, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="h-3.5 w-3.5 rounded-full bg-gradient-to-b from-cyan-400 to-purple-400 shadow-lg shadow-cyan-400/60"
            />
          ))}
        </motion.div>

        {/* Status text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="text-xs text-gray-500 font-light mt-4"
        >
          Cargando experiencia increíble...
        </motion.p>
      </div>
    </motion.div>
  );
}
