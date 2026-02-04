"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-background via-background-secondary to-background"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-b from-primary/5 to-transparent blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          className="absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full bg-gradient-to-t from-accent/5 to-transparent blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Logo with glow effect */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="relative"
        >
          {/* Outer glow */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-50 blur-2xl"
          />

          {/* Inner logo container */}
          <div className="relative h-32 w-32 flex items-center justify-center rounded-full border border-primary/30 bg-background/50 backdrop-blur-xl shadow-2xl">
            {/* Rotating border */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-transparent to-accent opacity-40"
            />

            {/* Logo image */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="relative h-24 w-24"
            >
              <Image
                src="/images/mylogo.png"
                alt="Logo"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Text with reveal animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <h1 className="font-display text-5xl font-bold">
            <motion.span
              animate={{ backgroundPosition: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto]"
            >
              Jhon Cano
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm text-foreground-secondary/80 font-light tracking-widest uppercase"
          >
            Full Stack Developer
          </motion.p>
        </motion.div>

        {/* Progress bar with gradient */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "12rem" }}
          transition={{ duration: 2.5, delay: 0.4 }}
          className="h-1 rounded-full bg-background-secondary/40 border border-primary/10 overflow-hidden backdrop-blur-sm"
        >
          <motion.div
            animate={{ x: ["0%", "300%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </motion.div>

        {/* Floating dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-3 mt-4"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="h-3 w-3 rounded-full bg-gradient-to-b from-primary to-accent shadow-lg shadow-primary/50"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
