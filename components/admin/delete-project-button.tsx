"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteProject } from "@/lib/actions/projects";

type DeleteProjectButtonProps = {
    projectId: string;
};

export function DeleteProjectButton({ projectId }: DeleteProjectButtonProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showConfirm, setShowConfirm] = useState(false);

    function handleDelete() {
        if (!showConfirm) {
            setShowConfirm(true);
            setTimeout(() => setShowConfirm(false), 3000);
            return;
        }

        startTransition(async () => {
            await deleteProject(projectId);
            router.refresh();
        });
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={isPending}
            className={showConfirm ? "text-red-500 hover:text-red-600" : ""}
        >
            <Trash2 className="h-4 w-4" />
            {showConfirm && <span className="ml-2 text-xs">¿Confirmar?</span>}
        </Button>
    );
}