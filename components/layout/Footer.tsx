import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

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
    href: "https://linkedin.com/in/jhoncano",
    icon: Linkedin,
    label: "LinkedIn",
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

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-secondary/50">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl font-bold gradient-text">
                Jhon Cano
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-foreground-secondary">
              Full Stack Developer especializado en crear aplicaciones web
              modernas y escalables. De Medellín para el mundo.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-secondary transition-smooth hover:text-primary"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Navegación
            </h3>
            <ul className="space-y-3">
              {footerLinks.navegacion.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-secondary transition-smooth hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-secondary transition-smooth hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-foreground-tertiary">
            © {new Date().getFullYear()} Jhon Cano. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}