"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loading() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // El loading se mantiene visible mientras carga la página
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // Máximo 5 segundos

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gradient-to-br from-background via-background-secondary to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-b from-primary/5 to-transparent blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full bg-gradient-to-t from-accent/5 to-transparent blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Logo with glow effect */}
        <div className="relative">
          {/* Outer glow */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-0 blur-2xl animate-pulse"
            style={{ animationDuration: "3s" }}
          />

          {/* Inner logo container */}
          <div className="relative h-28 w-28 flex items-center justify-center rounded-full border border-primary/20 bg-background/40 backdrop-blur-xl shadow-2xl">
            {/* Rotating border */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-transparent to-accent opacity-30 animate-spin"
              style={{ animationDuration: "4s" }}
            />

            {/* Logo image */}
            <div className="relative h-20 w-20">
              <Image
                src="/images/mylogo.png"
                alt="Logo"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </div>
        </div>

        {/* Text with reveal animation */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-display text-4xl font-bold">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              Bienvenido
            </span>
          </h1>

          <p className="text-sm text-foreground-secondary/80 max-w-xs font-light tracking-wide">
            Preparando una experiencia extraordinaria...
          </p>
        </div>

        {/* Progress bar with gradient */}
        <div className="w-48 h-1 rounded-full bg-background-secondary/40 border border-primary/10 overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{
              animation: "slideInRight 2s ease-in-out infinite",
              width: "30%",
            }}
          />
        </div>

        {/* Floating dots */}
        <div className="flex items-center justify-center gap-3 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2.5 w-2.5 rounded-full bg-gradient-to-b from-primary to-accent opacity-70"
              style={{
                animation: "bounce 1.4s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInRight {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(200%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          40% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
