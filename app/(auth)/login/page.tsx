import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CosmicBackground } from "@/components/ui/cosmic-background";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Inicia sesión en tu cuenta",
};

export default function LoginPage() {
  return (
    <CosmicBackground>
      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        {/* Back button */}
        <Link
          href="/"
          className="absolute top-8 left-8 group inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:gap-3"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Volver</span>
        </Link>

        <div className="w-full max-w-md">
          {/* Logo section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Bienvenido
            </h1>
            <p className="text-sm text-gray-300">Inicia sesión en tu cuenta</p>
          </div>

          {/* Glass card container */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
            <AuthForm type="login" />
          </div>

          {/* Footer text */}
          <p className="text-center text-xs text-gray-400 mt-6">
            ¿No tienes cuenta?{" "}
            <a
              href="/register"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </CosmicBackground>
  );
}