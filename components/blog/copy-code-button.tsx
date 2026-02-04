"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

type CopyCodeButtonProps = {
    code: string;
};

export function CopyCodeButton({ code }: CopyCodeButtonProps) {
    const [copied, setCopied] = useState(false);

    async function copyToClipboard() {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        toast.success("Código copiado!");

        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <button
            onClick={copyToClipboard}
            className="absolute right-2 top-2 rounded-lg bg-background-secondary p-2 opacity-0 transition-smooth hover:bg-background-tertiary group-hover:opacity-100"
            title="Copiar código"
        >
            {copied ? (
                <Check className="h-4 w-4 text-green-500" />
            ) : (
                <Copy className="h-4 w-4" />
            )}
        </button>
    );
}