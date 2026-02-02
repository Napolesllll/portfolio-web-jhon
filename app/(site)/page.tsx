"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto max-w-6xl px-4">
      {/* Hero Section */}
      <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-5xl font-bold sm:text-6xl lg:text-7xl">
            Hola, soy{" "}
            <span className="gradient-text">Jhon Cano</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 max-w-2xl text-xl text-foreground-secondary sm:text-2xl"
        >
          Construyendo experiencias web extraordinarias
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 max-w-xl text-foreground-tertiary"
        >
          Full Stack Developer especializado en React, Next.js y TypeScript.
          Creando productos digitales desde Medellín, Colombia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button asChild size="lg">
            <Link href="/projects">Ver Proyectos</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/contact">Contactar</Link>
          </Button>
        </motion.div>

        {/* Tech Stack Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 flex flex-wrap justify-center gap-4"
        >
          {["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "Node.js", "PostgreSQL"].map(
            (tech) => (
              <div
                key={tech}
                className="glass rounded-lg px-6 py-3 font-mono text-sm"
              >
                {tech}
              </div>
            )
          )}
        </motion.div>
      </section>
    </div>
  );
}