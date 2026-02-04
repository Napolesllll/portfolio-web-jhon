"use client";

import { useState, useTransition } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteTag } from "@/lib/actions/tags";
import { toast } from "sonner";

type DeleteTagButtonProps = {
    tagId: string;
    hasPosts: boolean;
};

export function DeleteTagButton({ tagId, hasPosts }: DeleteTagButtonProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showConfirm, setShowConfirm] = useState(false);

    function handleDelete() {
        if (hasPosts) {
            toast.error("No puedes eliminar un tag con posts");
            return;
        }

        if (!showConfirm) {
            setShowConfirm(true);
            setTimeout(() => setShowConfirm(false), 3000);
            return;
        }

        startTransition(async () => {
            const result = await deleteTag(tagId);
            if (result.success) {
                toast.success("Tag eliminado");
                router.refresh();
            } else {
                toast.error(result.error || "Error al eliminar");
            }
        });
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isPending || hasPosts}
            className="opacity-0 transition-smooth group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-30"
            title={hasPosts ? "No se puede eliminar (tiene posts)" : "Eliminar"}
        >
            <X className="h-4 w-4 text-foreground-tertiary hover:text-red-500" />
        </button>
    );
}