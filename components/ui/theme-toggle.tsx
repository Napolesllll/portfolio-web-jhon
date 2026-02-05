"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Evitar hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="relative overflow-hidden hover:bg-white/10 group"
      >
        {/* Sun Icon - Visible en Light Mode */}
        <motion.div
          initial={false}
          animate={{
            rotate: !isDark ? 0 : 360,
            opacity: !isDark ? 1 : 0,
            scale: !isDark ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="absolute"
        >
          <Sun className="h-5 w-5 text-yellow-400" />
        </motion.div>

        {/* Moon Icon - Visible en Dark Mode */}
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? 0 : -360,
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="absolute"
        >
          <Moon className="h-5 w-5 text-blue-300" />
        </motion.div>

        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  );
}