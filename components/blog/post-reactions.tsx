"use client";

import { useState, useOptimistic, useTransition } from "react";
import { motion } from "framer-motion";
import { addReaction, type ReactionType } from "@/lib/actions/reactions";
import { toast } from "sonner";

type PostReactionsProps = {
    postId: string;
    initialCounts: {
        FIRE: number;
        LIGHTBULB: number;
        THINKING: number;
    };
};

const reactions = [
    { type: "FIRE" as ReactionType, emoji: "🔥", label: "Útil" },
    { type: "LIGHTBULB" as ReactionType, emoji: "💡", label: "Inspirador" },
    { type: "THINKING" as ReactionType, emoji: "🤔", label: "Interesante" },
];

export function PostReactions({ postId, initialCounts }: PostReactionsProps) {
    const [isPending, startTransition] = useTransition();
    const [optimisticCounts, setOptimisticCounts] = useOptimistic(initialCounts);
    const [clickedReaction, setClickedReaction] = useState<ReactionType | null>(null);

    async function handleReaction(type: ReactionType) {
        setClickedReaction(type);

        startTransition(async () => {
            // Optimistic update
            setOptimisticCounts((prev) => ({
                ...prev,
                [type]: prev[type] + 1,
            }));

            const result = await addReaction(postId, type);
            if (result.success) {
                const labels = {
                    FIRE: "¡Qué bueno que te pareció útil!",
                    LIGHTBULB: "¡Me alegra haberte inspirado!",
                    THINKING: "¡Genial que te haya hecho pensar!",
                };
                toast.success(labels[type]);
            }

            setTimeout(() => setClickedReaction(null), 600);
        });
    }

    return (
        <div className="flex flex-wrap gap-3">
            {reactions.map(({ type, emoji, label }) => {
                const count = optimisticCounts[type];
                const isClicked = clickedReaction === type;

                return (
                    <motion.button
                        key={type}
                        onClick={() => handleReaction(type)}
                        disabled={isPending}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative flex items-center gap-2 rounded-full border border-border bg-background-secondary px-4 py-2 transition-smooth hover:border-primary hover:bg-background-tertiary disabled:opacity-50"
                    >
                        <motion.span
                            className="text-2xl"
                            animate={isClicked ? { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] } : {}}
                            transition={{ duration: 0.6 }}
                        >
                            {emoji}
                        </motion.span>

                        <span className="text-sm font-medium">{label}</span>

                        {count > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground"
                            >
                                {count}
                            </motion.span>
                        )}

                        {/* Hover tooltip */}
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg bg-background px-3 py-1 text-xs opacity-0 shadow-lg transition-smooth group-hover:opacity-100">
                            Click para reaccionar
                        </span>
                    </motion.button>
                );
            })}
        </div>
    );
}