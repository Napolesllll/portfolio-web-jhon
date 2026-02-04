import { Metadata } from "next";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
    title: "Contacto",
    description:
        "¿Tienes un proyecto en mente? Contacta conmigo y trabajemos juntos.",
};

export default function ContactPage() {
    return (
        <div className="container mx-auto max-w-6xl px-4 py-12">
            {/* Header */}
            <div className="mb-12 text-center">
                <h1 className="mb-4 font-display text-4xl font-bold sm:text-5xl">
                    Contacto
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-foreground-secondary">
                    ¿Tienes un proyecto en mente? Hablemos y hagamos algo increíble
                    juntos.
                </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-5">
                {/* Info de contacto */}
                <div className="space-y-8 lg:col-span-2">
                    <div>
                        <h2 className="mb-6 font-display text-2xl font-bold">
                            Información de Contacto
                        </h2>
                        <div className="space-y-6">
                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                    <Mail className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="mb-1 font-semibold">Email</h3>
                                    <a
                                        href="mailto:canojhon148@gmail.com"
                                        className="text-foreground-secondary transition-smooth hover:text-primary"
                                    >
                                        canojhon148@gmail.com
                                    </a>
                                </div>
                            </div>

                            {/* Teléfono */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                    <Phone className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="mb-1 font-semibold">Teléfono</h3>
                                    <a
                                        href="tel:+573023376544"
                                        className="text-foreground-secondary transition-smooth hover:text-primary"
                                    >
                                        +57 302 337 6544
                                    </a>
                                </div>
                            </div>

                            {/* Ubicación */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                    <MapPin className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="mb-1 font-semibold">Ubicación</h3>
                                    <p className="text-foreground-secondary">
                                        Medellín, Antioquia
                                        <br />
                                        Colombia
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Horario */}
                    <div className="rounded-xl border border-border bg-background-secondary p-6">
                        <h3 className="mb-4 font-semibold">Disponibilidad</h3>
                        <div className="space-y-2 text-sm text-foreground-secondary">
                            <p>Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                            <p>Sábados: 10:00 AM - 2:00 PM</p>
                            <p>Domingos: Cerrado</p>
                            <p className="mt-4 text-xs text-foreground-tertiary">
                                Zona horaria: COT (GMT-5)
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
                        <h3 className="mb-2 font-semibold">¿Prefieres agendar una llamada?</h3>
                        <p className="mb-4 text-sm text-foreground-secondary">
                            Podemos coordinar una videollamada para discutir tu proyecto en
                            detalle.
                        </p>
                        <a
                            href="https://cal.com/jhoncano"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        >
                            Agendar reunión
                            <Send className="h-4 w-4" />
                        </a>
                    </div>
                </div>

                {/* Formulario */}
                <div className="lg:col-span-3">
                    <div className="rounded-xl border border-border bg-background-secondary p-8">
                        <h2 className="mb-6 font-display text-2xl font-bold">
                            Envíame un Mensaje
                        </h2>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}