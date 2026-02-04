"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteCategory } from "@/lib/actions/categories";
import { toast } from "sonner";

type DeleteCategoryButtonProps = {
    categoryId: string;
    hasePosts: boolean;
};

export function DeleteCategoryButton({
    categoryId,
    hasePosts,
}: DeleteCategoryButtonProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showConfirm, setShowConfirm] = useState(false);

    function handleDelete() {
        if (hasePosts) {
            toast.error("No puedes eliminar una categoría con posts");
            return;
        }

        if (!showConfirm) {
            setShowConfirm(true);
            setTimeout(() => setShowConfirm(false), 3000);
            return;
        }

        startTransition(async () => {
            const result = await deleteCategory(categoryId);
            if (result.success) {
                toast.success("Categoría eliminada");
                router.refresh();
            } else {
                toast.error(result.error || "Error al eliminar");
            }
        });
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={isPending || hasePosts}
            className={showConfirm ? "text-red-500 hover:text-red-600" : ""}
        >
            <Trash2 className="h-4 w-4" />
            {showConfirm && <span className="ml-2 text-xs">¿Confirmar?</span>}
        </Button>
    );
}