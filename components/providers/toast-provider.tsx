"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export function ToastProvider() {
    const { theme } = useTheme();

    return (
        <Toaster
            theme={theme as "light" | "dark"}
            position="bottom-right"
            toastOptions={{
                style: {
                    background: "hsl(var(--background-secondary))",
                    color: "hsl(var(--foreground))",
                    border: "1px solid hsl(var(--border))",
                },
            }}
        />
    );
}