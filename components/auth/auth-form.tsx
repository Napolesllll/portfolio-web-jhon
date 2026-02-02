"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { login, register, loginWithGoogle, loginWithGitHub } from "@/lib/actions/auth";

type AuthFormProps = {
  type: "login" | "register";
};

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const isLogin = type === "login";

  async function handleSubmit(formData: FormData) {
    setError(null);

    startTransition(async () => {
      const result = isLogin
        ? await login(formData)
        : await register(formData);

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/");
        router.refresh();
      }
    });
  }

  async function handleGoogleLogin() {
    startTransition(async () => {
      await loginWithGoogle();
    });
  }

  async function handleGitHubLogin() {
    startTransition(async () => {
      await loginWithGitHub();
    });
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="mb-2 font-display text-3xl font-bold">
          {isLogin ? "Bienvenido de nuevo" : "Crear cuenta"}
        </h1>
        <p className="text-foreground-secondary">
          {isLogin
            ? "Ingresa a tu cuenta para continuar"
            : "Regístrate para comenzar"}
        </p>
      </div>

      {/* OAuth Buttons */}
      <div className="space-y-3">
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={isPending}
        >
          <Mail className="mr-2 h-5 w-5" />
          Continuar con Google
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={handleGitHubLogin}
          disabled={isPending}
        >
          <Github className="mr-2 h-5 w-5" />
          Continuar con GitHub
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-2 text-foreground-tertiary">
            O continuar con email
          </span>
        </div>
      </div>

      {/* Credentials Form */}
      <form action={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Nombre completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              disabled={isPending}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
              placeholder="Jhon Cano"
            />
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={isPending}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            disabled={isPending}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending
            ? "Cargando..."
            : isLogin
            ? "Iniciar sesión"
            : "Crear cuenta"}
        </Button>
      </form>

      <p className="text-center text-sm text-foreground-secondary">
        {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
        <Link
          href={isLogin ? "/register" : "/login"}
          className="font-medium text-primary hover:underline"
        >
          {isLogin ? "Regístrate" : "Inicia sesión"}
        </Link>
      </p>
    </div>
  );
}