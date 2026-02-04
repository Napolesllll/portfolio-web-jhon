"use client";

import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

type ConfettiButtonProps = {
    disabled?: boolean;
};

export function PublishWithConfetti({ disabled }: ConfettiButtonProps) {
    function celebrate() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#3b82f6", "#8b5cf6", "#ec4899"],
        });
    }

    return (
        <Button
            type="submit"
            name="published"
            value="true"
            disabled={disabled}
            onClick={celebrate}
        >
            <Eye className="mr-2 h-4 w-4" />
            Publicar
        </Button>
    );
}