"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

type NavbarProps = {
  children: React.ReactNode;
};

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Proyectos" },
  { href: "/about", label: "Sobre mí" },
];

export function Navbar({ children }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { scrollY } = useScroll();

  // Scroll effects
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["hsl(var(--background) / 0)", "hsl(var(--background) / 0.8)"]
  );

  const borderColor = useTransform(
    scrollY,
    [0, 50],
    ["hsl(var(--border) / 0)", "hsl(var(--border) / 1)"]
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
        }}
        className="fixed top-0 z-50 w-full border-b backdrop-blur-xl"
      >
        <nav className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <span className="font-display text-2xl font-bold gradient-text">
                JC
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-accent"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                isActive={pathname === link.href}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Actions */}
          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <div className="hidden items-center gap-2 text-sm text-foreground-tertiary lg:flex">
              <kbd className="rounded border border-border bg-background-secondary px-2 py-1 text-xs font-mono">
                ⌘K
              </kbd>
              <span className="text-xs">para búsqueda rápida</span>
            </div>
            <ThemeToggle />
            {children}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                initial={false}
                animate={mobileMenuOpen ? "open" : "closed"}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </Button>
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
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-16 z-40 bg-background/95 backdrop-blur-xl md:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <nav className="container mx-auto flex flex-col gap-4 px-4 py-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                className={cn(
                  "block rounded-lg px-4 py-3 text-lg font-medium transition-smooth",
                  pathname === link.href
                    ? "bg-background-secondary text-primary"
                    : "text-foreground-secondary hover:bg-background-secondary hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: navLinks.length * 0.1 }}
            className="mt-4"
          >
            <Button asChild className="w-full">
              <Link href="/contact">Contacto</Link>
            </Button>
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
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
        />
      )}
    </>
  );
}

// Componente NavLink con animación de underline
function NavLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="group relative">
      <span
        className={cn(
          "text-sm font-medium transition-smooth",
          isActive
            ? "text-foreground"
            : "text-foreground-secondary hover:text-foreground"
        )}
      >
        {children}
      </span>
      <motion.div
        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
        initial={{ width: isActive ? "100%" : "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </Link>
  );
}