import { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactAvailability } from "@/components/contact/contact-availability";
import { ContactCTA } from "@/components/contact/contact-cta";
import { ContactFormWrapper } from "@/components/contact/contact-form-wrapper";
import { WhatsAppButton } from "@/components/contact/whatsapp-button";

export const metadata: Metadata = {
    title: "Contacto",
    description:
        "¿Tienes un proyecto en mente? Contacta conmigo y trabajemos juntos.",
};

export default function ContactPage() {
    return (
        <div className="relative min-h-screen">
            {/* Background Gradient */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-950" />

            {/* Hero Section */}
            <div className="container mx-auto max-w-4xl px-4 pt-16 pb-20">
                <ContactHero />
            </div>

            {/* Main Content */}
            <div className="container mx-auto max-w-6xl px-4 pb-20">
                <div className="grid gap-12 lg:grid-cols-5">
                    {/* Info de contacto */}
                    <div className="space-y-8 lg:col-span-2">
                        <ContactInfo
                            email="canojhon148@gmail.com"
                            phone="+57 302 337 6544"
                            location="Medellín, Antioquia, Colombia"
                        />

                        {/* Disponibilidad */}
                        <ContactAvailability />

                        {/* CTA */}
                        <ContactCTA />
                    </div>

                    {/* Formulario */}
                    <div className="lg:col-span-3">
                        <ContactFormWrapper>
                            <ContactForm />
                        </ContactFormWrapper>
                    </div>
                </div>
            </div>

            {/* WhatsApp Button */}
            <WhatsAppButton />
        </div>
    );
}