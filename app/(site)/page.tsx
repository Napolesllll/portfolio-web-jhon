"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Code2, Zap, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,

    },
  },
};

const techBadgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
  hover: {
    scale: 1.08,
    y: -4,
    boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)",
    transition: {
      duration: 0.2,
    },
  },
};

const floatingVariants = {
  float: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const tech = [
  { name: "React", color: "from-blue-400 to-cyan-400" },
  { name: "Next.js", color: "from-gray-300 to-gray-100" },
  { name: "TypeScript", color: "from-blue-600 to-blue-400" },
  { name: "Tailwind CSS", color: "from-cyan-400 to-blue-500" },
  { name: "Prisma", color: "from-green-400 to-emerald-600" },
  { name: "Node.js", color: "from-green-500 to-green-400" },
  { name: "PostgreSQL", color: "from-blue-500 to-purple-600" },
];

const stats = [
  { label: "Proyectos completados", value: "15+" },
  { label: "Clientes satisfechos", value: "10+" },
  { label: "Años de experiencia", value: "5+" },
];

export default function Home() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const generatedParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.6 + 0.2,
    }));
    setParticles(generatedParticles);
  }, []);
  return (
    <div className="relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20" />

        {/* Animated radial gradient */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            backgroundSize: "200% 200%",
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {mounted && particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background: `radial-gradient(circle at 30% 30%, rgba(59, 130, 246, ${particle.opacity}), rgba(139, 92, 246, ${particle.opacity * 0.5}))`,
                boxShadow: `0 0 ${particle.size * 2}px rgba(59, 130, 246, ${particle.opacity * 0.6})`,
              }}
              animate={{
                y: [0, -300, 0],
                x: [0, Math.sin(particle.id) * 100, 0],
                opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Blob 1 */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/20 rounded-full blur-3xl"
        />

        {/* Blob 2 */}
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />

        {/* Blob 3 */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 right-1/4 w-72 h-72 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto max-w-6xl px-4 relative">
        {/* Hero Section */}
        <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-4xl"
          >
            {/* Badge con animación */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:border-white/40 transition-colors"
            >
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">Bienvenido a mi portafolio</span>
            </motion.div>

            {/* Main heading con efecto de revelación */}
            <motion.div variants={itemVariants}>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Hola, soy{" "}
                <motion.span
                  className="inline-block gradient-text"
                  animate={{ backgroundPosition: ["0%", "100%"] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Jhon Cano
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtítulo principal */}
            <motion.p
              variants={itemVariants}
              className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 mb-6"
            >
              Full Stack Developer & Creative Builder
            </motion.p>

            {/* Descripción */}
            <motion.p
              variants={itemVariants}
              className="max-w-2xl mx-auto text-lg text-foreground-secondary leading-relaxed"
            >
              Creo experiencias web extraordinarias combinando diseño moderno y código limpio. Especializado en{" "}
              <span className="font-semibold text-blue-400">React</span>,{" "}
              <span className="font-semibold text-blue-400">Next.js</span> y{" "}
              <span className="font-semibold text-blue-400">TypeScript</span>.
            </motion.p>

            {/* Ubicación */}
            <motion.p
              variants={itemVariants}
              className="mt-4 text-foreground-tertiary flex items-center justify-center gap-2"
            >
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Desde Medellín, Colombia
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
                  <Link href="/projects" className="inline-flex items-center gap-2">
                    Ver Proyectos
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="h-14 px-8 text-base font-semibold"
                >
                  <Link href="/contact">Trabajemos juntos</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex items-center justify-center gap-4"
            >
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "/contact", label: "Email" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-colors group"
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-20 w-full grid grid-cols-3 gap-3 sm:gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center p-3 sm:p-6 rounded-lg sm:rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <motion.p className="text-xl sm:text-4xl font-bold gradient-text mb-1 sm:mb-2">
                  {stat.value}
                </motion.p>
                <p className="text-xs sm:text-sm text-foreground-tertiary">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech Stack Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-24 w-full"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Code2 className="w-5 h-5 text-blue-400" />
                <h2 className="text-2xl sm:text-3xl font-bold">Stack Tecnológico</h2>
              </div>
              <p className="text-foreground-secondary">
                Herramientas y tecnologías que uso para crear experiencias increíbles
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
            >
              {tech.map((item, i) => (
                <motion.div
                  key={item.name}
                  custom={i}
                  variants={techBadgeVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="group relative"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-lg opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300`}
                  />
                  <div
                    className={`relative bg-gradient-to-r ${item.color} bg-clip-text text-transparent backdrop-blur-md rounded-lg px-5 py-3 font-mono text-sm font-medium border border-white/10 group-hover:border-white/30 transition-all duration-300 bg-white/5 group-hover:bg-white/10 inline-block`}
                  >
                    {item.name}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-24 flex flex-col items-center gap-2 text-foreground-tertiary"
          >
            <p className="text-sm">Explora más</p>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </section>
      </div>
    </div>
  );
}