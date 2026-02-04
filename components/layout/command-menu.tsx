"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Home,
    FileText,
    Briefcase,
    User,
    Moon,
    Sun,
    Github,
    Linkedin,
    Mail,
} from "lucide-react";
import { useTheme } from "next-themes";

export function CommandMenu() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const { setTheme } = useTheme();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Buscar o ejecutar comando..." />
            <CommandList>
                <CommandEmpty>No se encontraron resultados.</CommandEmpty>

                <CommandGroup heading="Navegación">
                    <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
                        <Home className="mr-2 h-4 w-4" />
                        Inicio
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/blog"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        Blog
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/projects"))}
                    >
                        <Briefcase className="mr-2 h-4 w-4" />
                        Proyectos
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/about"))}>
                        <User className="mr-2 h-4 w-4" />
                        Sobre mí
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Tema">
                    <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
                        <Sun className="mr-2 h-4 w-4" />
                        Modo Claro
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
                        <Moon className="mr-2 h-4 w-4" />
                        Modo Oscuro
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Social">
                    <CommandItem
                        onSelect={() =>
                            runCommand(() =>
                                window.open("https://github.com/jhoncano", "_blank")
                            )
                        }
                    >
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                    </CommandItem>
                    <CommandItem
                        onSelect={() =>
                            runCommand(() =>
                                window.open("https://linkedin.com/in/jhoncano", "_blank")
                            )
                        }
                    >
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                    </CommandItem>
                    <CommandItem
                        onSelect={() =>
                            runCommand(() =>
                                window.open("mailto:canojhon148@gmail.com", "_blank")
                            )
                        }
                    >
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}