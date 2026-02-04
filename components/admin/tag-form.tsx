"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createTag } from "@/lib/actions/tags";
import { toast } from "sonner";

export function TagForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            const result = await createTag(formData);
            if (result.success) {
                toast.success("Tag creado correctamente");
                router.refresh();
                (document.getElementById("tag-form") as HTMLFormElement)?.reset();
            } else {
                toast.error(result.error || "Error al crear tag");
            }
        });
    }

    return (
        <form id="tag-form" action={handleSubmit} className="space-y-4">
            <div>
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-foreground"
                >
                    Nombre del Tag *
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    disabled={isPending}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                    placeholder="ej: Next.js"
                />
            </div>

            <Button type="submit" disabled={isPending} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                {isPending ? "Creando..." : "Crear Tag"}
            </Button>
        </form>
    );
}