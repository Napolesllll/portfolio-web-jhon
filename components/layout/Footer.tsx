"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Mail, Twitter, ArrowRight, Code2, Sparkles, MessageCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

const footerLinks = {
  navegacion: [
    { href: "/", label: "Inicio" },
    { href: "/blog", label: "Blog" },
    { href: "/projects", label: "Proyectos" },
    { href: "/about", label: "Sobre mí" },
  ],
  legal: [
    { href: "/privacy", label: "Privacidad" },
    { href: "/terms", label: "Términos" },
  ],
};

const socialLinks = [
  {
    href: "https://github.com/jhoncano",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://wa.me/573023376544",
    icon: MessageCircle,
    label: "WhatsApp",
  },
  {
    href: "https://twitter.com/jhoncano",
    icon: Twitter,
    label: "Twitter",
  },
  {
    href: "mailto:canojhon148@gmail.com",
    icon: Mail,
    label: "Email",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-background via-background to-black">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"
        animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto max-w-6xl px-4 py-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-12 md:grid-cols-4 mb-16"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="md:col-span-2 group">
            <Link href="/" className="inline-block mb-6">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="relative h-16 w-16"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="relative h-full w-full bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  JC
                </div>
              </motion.div>
            </Link>

            <motion.p
              variants={itemVariants}
              className="max-w-xs text-sm text-gray-300 leading-relaxed mb-6 group-hover:text-white transition-colors"
            >
              Full Stack Developer especializado en crear aplicaciones web
              modernas, escalables y visualmente extraordinarias. De Medellín
              para el mundo.
            </motion.p>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4">
              {socialLinks.map((link) => {
                const colorClasses = {
                  "GitHub": "text-gray-400 hover:text-white hover:bg-gray-500/20",
                  "WhatsApp": "text-green-400 hover:text-green-300 hover:bg-green-500/20",
                  "Twitter": "text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20",
                  "Email": "text-red-400 hover:text-red-300 hover:bg-red-500/20",
                };

                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredSocial(link.label)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2.5 rounded-lg border border-white/10 backdrop-blur-md transition-all duration-300 ${colorClasses[link.label as keyof typeof colorClasses] || "text-gray-400 hover:text-white"}`}
                    aria-label={link.label}
                  >
                    <motion.div
                      animate={
                        hoveredSocial === link.label
                          ? { rotate: 360 }
                          : { rotate: 0 }
                      }
                      transition={{ duration: 0.6 }}
                    >
                      <link.icon className="h-5 w-5" />
                    </motion.div>
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={itemVariants}>
            <motion.h3 className="mb-6 flex items-center gap-2 font-semibold text-white">
              <Code2 className="w-5 h-5 text-cyan-400" />
              Navegación
            </motion.h3>
            <motion.ul className="space-y-3">
              {footerLinks.navegacion.map((link, i) => (
                <motion.li
                  key={link.href}
                  variants={linkVariants}
                  custom={i}
                  className="group/link"
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-cyan-400 transition-colors relative"
                  >
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-cyan-500 opacity-0 group-hover/link:opacity-100"
                      layoutId={`dot-${link.href}`}
                    />
                    {link.label}
                    <motion.div
                      className="w-3 h-3 opacity-0 group-hover/link:opacity-100 ml-1"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      <ArrowRight className="w-3 h-3 text-cyan-400" />
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={itemVariants}>
            <motion.h3 className="mb-6 flex items-center gap-2 font-semibold text-white">
              <Sparkles className="w-5 h-5 text-blue-400" />
              Legal
            </motion.h3>
            <motion.ul className="space-y-3">
              {footerLinks.legal.map((link, i) => (
                <motion.li
                  key={link.href}
                  variants={linkVariants}
                  custom={i}
                  className="group/link"
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-blue-400 transition-colors relative"
                  >
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover/link:opacity-100"
                      layoutId={`dot-legal-${link.href}`}
                    />
                    {link.label}
                    <motion.div
                      className="w-3 h-3 opacity-0 group-hover/link:opacity-100 ml-1"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                    >
                      <ArrowRight className="w-3 h-3 text-blue-400" />
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Divider with Glow */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent origin-left mb-8"
        />

        {/* Copyright Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <motion.p
            className="text-sm text-gray-400"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            © {new Date().getFullYear()} Jhon Cano. Todos los derechos
            reservados.
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-2 text-xs text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan-500"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span>Crafted with love & code</span>
            <motion.div
              className="w-2 h-2 rounded-full bg-purple-500"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}