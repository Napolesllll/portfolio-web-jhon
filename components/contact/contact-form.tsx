"use client";

import { useState, useTransition } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendContactEmail } from "@/lib/actions/contact";
import { toast } from "sonner";
import confetti from "canvas-confetti";

export function ContactForm() {
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        startTransition(async () => {
            const result = await sendContactEmail(formData);

            if (result.success) {
                toast.success("¡Mensaje enviado! Te responderé pronto 🚀");

                // Confetti celebration
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                });

                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                });
            } else {
                toast.error(result.error || "Error al enviar el mensaje");
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-foreground"
                >
                    Nombre completo *
                </label>
                <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={isPending}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                    placeholder="Tu nombre"
                />
            </div>

            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-foreground"
                >
                    Email *
                </label>
                <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={isPending}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                    placeholder="tu@email.com"
                />
            </div>

            {/* Asunto */}
            <div>
                <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-foreground"
                >
                    Asunto *
                </label>
                <input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                    }
                    disabled={isPending}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                    placeholder="¿De qué quieres hablar?"
                />
            </div>

            {/* Mensaje */}
            <div>
                <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-foreground"
                >
                    Mensaje *
                </label>
                <textarea
                    id="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                    }
                    disabled={isPending}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                    placeholder="Cuéntame sobre tu proyecto..."
                />
                <p className="mt-2 text-xs text-foreground-tertiary">
                    Mínimo 20 caracteres
                </p>
            </div>

            {/* Botón */}
            <Button type="submit" disabled={isPending} className="w-full" size="lg">
                <Send className="mr-2 h-5 w-5" />
                {isPending ? "Enviando..." : "Enviar Mensaje"}
            </Button>

            <p className="text-center text-xs text-foreground-tertiary">
                Respondo todos los mensajes en menos de 24 horas
            </p>
        </form>
    );
}