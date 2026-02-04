"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createCategory } from "@/lib/actions/categories";
import { toast } from "sonner";

export function CategoryForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            const result = await createCategory(formData);
            if (result.success) {
                toast.success("Categoría creada correctamente");
                router.refresh();
                // Reset form
                (document.getElementById("category-form") as HTMLFormElement)?.reset();
            } else {
                toast.error(result.error || "Error al crear categoría");
            }
        });
    }

    return (
        <form id="category-form" action={handleSubmit} className="space-y-4">
            <div>
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-foreground"
                >
                    Nombre *
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    disabled={isPending}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                    placeholder="ej: Desarrollo Web"
                />
            </div>

            <div>
                <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-foreground"
                >
                    Descripción
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={2}
                    disabled={isPending}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                    placeholder="Breve descripción..."
                />
            </div>

            <div>
                <label
                    htmlFor="color"
                    className="mb-2 block text-sm font-medium text-foreground"
                >
                    Color *
                </label>
                <div className="flex gap-2">
                    <input
                        id="color"
                        name="color"
                        type="color"
                        required
                        defaultValue="#3b82f6"
                        disabled={isPending}
                        className="h-10 w-20 cursor-pointer rounded border border-border"
                    />
                    <input
                        type="text"
                        disabled
                        value="#3b82f6"
                        className="flex-1 rounded-lg border border-border bg-background px-4 py-2 font-mono text-sm"
                    />
                </div>
            </div>

            <Button type="submit" disabled={isPending} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                {isPending ? "Creando..." : "Crear Categoría"}
            </Button>
        </form>
    );
}