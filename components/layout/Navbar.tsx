"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

type NavbarProps = {
  children: React.ReactNode;
};

const navLinks = [
  { href: "/", label: "Inicio", icon: "🏠" },
  { href: "/blog", label: "Blog", icon: "📝" },
  { href: "/projects", label: "Proyectos", icon: "💼" },
  { href: "/about", label: "Sobre mí", icon: "👤" },
];

export function Navbar({ children }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { scrollY } = useScroll();

  // Scroll effects - más sofisticados
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    [
      "rgba(15, 23, 42, 0)",
      "rgba(15, 23, 42, 0.85)"
    ]
  );

  const borderColor = useTransform(
    scrollY,
    [0, 100],
    [
      "rgba(34, 211, 238, 0)",
      "rgba(34, 211, 238, 0.3)"
    ]
  );

  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    [
      "0 0 0 rgba(34, 211, 238, 0)",
      "0 8px 32px rgba(34, 211, 238, 0.1)"
    ]
  );

  // Cerrar mobile menu cuando cambia la ruta
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevenir scroll cuando mobile menu está abierto
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        style={{
          backgroundColor,
          borderBottomColor: borderColor,
          boxShadow,
        }}
        className="fixed top-0 z-50 w-full border-b border-cyan-400/10 backdrop-blur-2xl"
      >
        {/* Background gradient line */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          style={{
            opacity: useTransform(scrollY, [0, 100], [0, 1]),
          }}
        />

        <nav className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 relative z-10">
          {/* Logo con glow */}
          <Link href="/" className="group flex items-center gap-2 relative">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative h-20 w-20 flex items-center justify-center"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-lg opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />

              <Image
                src="/images/mylogo.png"
                alt="Logo"
                fill
                className="object-contain drop-shadow-lg"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <NavLink
                  href={link.href}
                  isActive={pathname === link.href}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            {/* Keyboard shortcut indicator */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-all"
            >
              <kbd className="text-xs font-mono text-gray-400">⌘K</kbd>
            </motion.div>

            <ThemeToggle />
            {children}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              <motion.div
                initial={false}
                animate={mobileMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-cyan-400" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          y: mobileMenuOpen ? 0 : -20,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "fixed inset-x-0 top-16 z-40 backdrop-blur-2xl md:hidden border-b border-cyan-400/10",
          "bg-gradient-to-b from-slate-950/95 to-slate-950/80",
          mobileMenuOpen ? "block" : "hidden pointer-events-none"
        )}
      >
        <nav className="container mx-auto flex flex-col items-center gap-2 px-4 py-8 max-w-2xl">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="w-full"
            >
              <Link
                href={link.href}
                className={cn(
                  "block rounded-xl px-4 py-3 text-base font-medium transition-all duration-300",
                  "hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-purple-500/10",
                  "border border-transparent hover:border-cyan-400/30",
                  pathname === link.href
                    ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/10 text-cyan-400 border-cyan-400/50"
                    : "text-gray-300"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{link.icon}</span>
                  {link.label}
                </div>
              </Link>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: navLinks.length * 0.1, duration: 0.3 }}
            className="mt-4 w-full"
          >
            <Button
              asChild
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-medium rounded-xl"
            >
              <Link href="/contact">Contacto</Link>
            </Button>
          </motion.div>

          {/* Auth buttons en móvil */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (navLinks.length + 1) * 0.1, duration: 0.3 }}
            className="mt-4 flex w-full flex-col items-center gap-2 border-t border-cyan-400/10 pt-4"
          >
            {children}
          </motion.div>
        </nav>
      </motion.div>

      {/* Overlay para mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
        />
      )}
    </>
  );
}

// Componente NavLink épico con animaciones sorprendentes
function NavLink({
  href,
  isActive,
  icon,
  children,
}: {
  href: string;
  isActive: boolean;
  icon?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="group relative inline-block">
      {/* Content */}
      <div className="flex items-center gap-2 relative z-10 px-1 py-2">
        {icon && (
          <motion.span
            animate={isActive ? { rotate: 10, scale: 1.2 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-lg"
          >
            {icon}
          </motion.span>
        )}
        <span
          className={cn(
            "text-sm font-medium transition-all duration-300 whitespace-nowrap",
            isActive
              ? "text-cyan-400 font-semibold"
              : "text-gray-300 group-hover:text-white"
          )}
        >
          {children}
        </span>
      </div>

      {/* Background glow effect - más compacto */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-md group-hover:from-cyan-500/40 group-hover:to-purple-500/40 -z-10"
      />

      {/* Border effect */}
      <motion.div
        className="absolute inset-0 rounded-lg border border-transparent group-hover:border-cyan-400/50 transition-colors duration-300 -z-10"
        initial={false}
        animate={{
          borderColor: isActive ? "rgba(34, 211, 238, 0.5)" : "transparent",
        }}
      />

      {/* Animated underline with glow */}
      <motion.div
        className="absolute -bottom-1 left-1 right-1 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full shadow-lg shadow-cyan-400/50"
        initial={{ width: isActive ? "calc(100% - 8px)" : "0%" }}
        whileHover={{ width: "calc(100% - 8px)" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </Link>
  );
}