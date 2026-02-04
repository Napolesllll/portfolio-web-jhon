"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Tags,
  Briefcase,
  Settings,
  ArrowLeft,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Posts", href: "/admin/posts", icon: FileText },
  { name: "Categorías", href: "/admin/categories", icon: FolderOpen },
  { name: "Tags", href: "/admin/tags", icon: Tags },
  { name: "Proyectos", href: "/admin/projects", icon: Briefcase },
  { name: "Configuración", href: "/admin/settings", icon: Settings },
];

type AdminHeaderProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: "USER" | "ADMIN";
  };
};

export function AdminHeader({ user }: AdminHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-6">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <div className="flex items-center gap-4 lg:ml-auto">
            <ThemeToggle />
            <UserMenu user={user} />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          y: mobileMenuOpen ? 0 : -20,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-16 z-30 bg-background/95 backdrop-blur-xl lg:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <nav className="container flex flex-col gap-2 px-4 py-4">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground-secondary hover:bg-background-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </motion.div>
            );
          })}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: navigation.length * 0.1 }}
            className="mt-4 border-t border-border pt-4"
          >
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground-secondary transition-smooth hover:bg-background-secondary hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al sitio
            </Link>
          </motion.div>
        </nav>
      </motion.div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm lg:hidden"
        />
      )}
    </>
  );
}