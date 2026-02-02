import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind sin conflictos
 * Estilo Josh Comeau: funciones pequeñas y útiles
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatea fechas en español
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  
  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/**
 * Calcula tiempo de lectura (palabras por minuto)
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return readingTime;
}

/**
 * Genera slug SEO-friendly
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Elimina acentos
    .replace(/[^a-z0-9\s-]/g, "") // Solo letras, números, espacios y guiones
    .trim()
    .replace(/\s+/g, "-") // Espacios a guiones
    .replace(/-+/g, "-"); // Múltiples guiones a uno solo
}

/**
 * Trunca texto con ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}

/**
 * Delay para animaciones (útil con Framer Motion)
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Formatea números grandes (1000 → 1K)
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}