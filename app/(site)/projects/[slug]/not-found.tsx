import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 font-display text-6xl font-bold">404</h1>
      <h2 className="mb-4 text-2xl font-bold">Proyecto no encontrado</h2>
      <p className="mb-8 text-foreground-secondary">
        El proyecto que buscas no existe.
      </p>
      <Button asChild>
        <Link href="/projects">Volver a proyectos</Link>
      </Button>
    </div>
  );
}