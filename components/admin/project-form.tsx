"use client";

import { useState, useTransition } from "react";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TiptapEditor } from "./tiptap-editor";
import { createProject, updateProject } from "@/lib/actions/projects";
import Link from "next/link";

type ProjectFormProps = {
    project?: {
        id: string;
        title: string;
        description: string;
        content: string;
        coverImage: string;
        stack: string[];
        liveUrl: string | null;
        githubUrl: string | null;
        featured: boolean;
        status: string;
        metrics: any;
    };
};

export function ProjectForm({ project }: ProjectFormProps) {
    const [isPending, startTransition] = useTransition();
    const [content, setContent] = useState(project?.content || "");
    const [coverImageUrl, setCoverImageUrl] = useState(project?.coverImage || "");
    const [isUploadingCover, setIsUploadingCover] = useState(false);
    const [stack, setStack] = useState<string[]>(project?.stack || []);
    const [stackInput, setStackInput] = useState("");
    const [metrics, setMetrics] = useState<Record<string, string>>(
        (project?.metrics as Record<string, string>) || {}
    );
    const [metricKey, setMetricKey] = useState("");
    const [metricValue, setMetricValue] = useState("");

    const isEditing = !!project;

    async function handleSubmit(formData: FormData) {
        formData.set("content", content);
        formData.set("coverImage", coverImageUrl);
        formData.set("stack", stack.join(","));
        formData.set("metrics", JSON.stringify(metrics));

        startTransition(async () => {
            if (isEditing) {
                await updateProject(project.id, formData);
            } else {
                await createProject(formData);
            }
        });
    }

    async function handleCoverImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingCover(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Error al subir imagen");

            const data = await response.json();
            setCoverImageUrl(data.url);
        } catch (error) {
            console.error("Error:", error);
            alert("Error al subir la imagen");
        } finally {
            setIsUploadingCover(false);
        }
    }

    function addTech() {
        if (stackInput.trim() && !stack.includes(stackInput.trim())) {
            setStack([...stack, stackInput.trim()]);
            setStackInput("");
        }
    }

    function removeTech(tech: string) {
        setStack(stack.filter((t) => t !== tech));
    }

    function addMetric() {
        if (metricKey.trim() && metricValue.trim()) {
            setMetrics({ ...metrics, [metricKey.trim()]: metricValue.trim() });
            setMetricKey("");
            setMetricValue("");
        }
    }

    function removeMetric(key: string) {
        const newMetrics = { ...metrics };
        delete newMetrics[key];
        setMetrics(newMetrics);
    }

    return (
        <form action={handleSubmit} className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Button asChild variant="ghost" type="button">
                    <Link href="/admin/projects">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver
                    </Link>
                </Button>

                <Button type="submit" disabled={isPending}>
                    <Save className="mr-2 h-4 w-4" />
                    {isPending ? "Guardando..." : "Guardar Proyecto"}
                </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Contenido principal */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Título */}
                    <div>
                        <label
                            htmlFor="title"
                            className="mb-2 block text-sm font-medium text-foreground"
                        >
                            Título *
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            defaultValue={project?.title}
                            disabled={isPending}
                            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-2xl font-bold text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                            placeholder="Nombre del proyecto"
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label
                            htmlFor="description"
                            className="mb-2 block text-sm font-medium text-foreground"
                        >
                            Descripción *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            required
                            defaultValue={project?.description}
                            disabled={isPending}
                            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                            placeholder="Breve descripción del proyecto..."
                        />
                    </div>

                    {/* Contenido (Caso de estudio) */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Caso de Estudio *
                        </label>
                        <TiptapEditor content={content} onChange={setContent} />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Imagen de portada */}
                    <div className="rounded-lg border border-border bg-background-secondary p-6">
                        <h3 className="mb-4 font-semibold">Imagen de Portada *</h3>

                        {coverImageUrl && (
                            <div className="mb-4">
                                <img
                                    src={coverImageUrl}
                                    alt="Cover preview"
                                    className="w-full rounded-lg"
                                />
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverImageUpload}
                            disabled={isUploadingCover || isPending}
                            className="w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                        />

                        {isUploadingCover && (
                            <p className="mt-2 text-sm text-foreground-secondary">
                                Subiendo...
                            </p>
                        )}
                    </div>

                    {/* URLs */}
                    <div className="rounded-lg border border-border bg-background-secondary p-6">
                        <h3 className="mb-4 font-semibold">Enlaces</h3>

                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="liveUrl"
                                    className="mb-2 block text-sm text-foreground-secondary"
                                >
                                    URL Demo
                                </label>
                                <input
                                    id="liveUrl"
                                    name="liveUrl"
                                    type="url"
                                    defaultValue={project?.liveUrl || ""}
                                    disabled={isPending}
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="https://..."
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="githubUrl"
                                    className="mb-2 block text-sm text-foreground-secondary"
                                >
                                    URL GitHub
                                </label>
                                <input
                                    id="githubUrl"
                                    name="githubUrl"
                                    type="url"
                                    defaultValue={project?.githubUrl || ""}
                                    disabled={isPending}
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="https://github.com/..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Stack Tecnológico */}
                    <div className="rounded-lg border border-border bg-background-secondary p-6">
                        <h3 className="mb-4 font-semibold">Stack Tecnológico *</h3>

                        <div className="mb-4 flex gap-2">
                            <input
                                type="text"
                                value={stackInput}
                                onChange={(e) => setStackInput(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                                disabled={isPending}
                                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="ej: Next.js"
                            />
                            <Button
                                type="button"
                                size="sm"
                                onClick={addTech}
                                disabled={isPending}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {stack.map((tech) => (
                                <span
                                    key={tech}
                                    className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                                >
                                    {tech}
                                    <button
                                        type="button"
                                        onClick={() => removeTech(tech)}
                                        disabled={isPending}
                                        className="hover:text-primary/70"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                            ))}
                        </div>

                        {stack.length === 0 && (
                            <p className="text-sm text-foreground-tertiary">
                                Agrega tecnologías usadas en el proyecto
                            </p>
                        )}
                    </div>

                    {/* Métricas */}
                    <div className="rounded-lg border border-border bg-background-secondary p-6">
                        <h3 className="mb-4 font-semibold">Métricas del Proyecto</h3>

                        <div className="mb-4 space-y-2">
                            <input
                                type="text"
                                value={metricKey}
                                onChange={(e) => setMetricKey(e.target.value)}
                                disabled={isPending}
                                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="ej: Usuarios"
                            />
                            <input
                                type="text"
                                value={metricValue}
                                onChange={(e) => setMetricValue(e.target.value)}
                                disabled={isPending}
                                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="ej: 5000+"
                            />
                            <Button
                                type="button"
                                size="sm"
                                onClick={addMetric}
                                disabled={isPending}
                                className="w-full"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Agregar Métrica
                            </Button>
                        </div>

                        <div className="space-y-2">
                            {Object.entries(metrics).map(([key, value]) => (
                                <div
                                    key={key}
                                    className="flex items-center justify-between rounded-lg bg-background p-3"
                                >
                                    <div>
                                        <p className="text-xs font-medium uppercase text-foreground-secondary">
                                            {key}
                                        </p>
                                        <p className="font-bold">{value}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeMetric(key)}
                                        disabled={isPending}
                                        className="text-foreground-tertiary hover:text-red-500"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {Object.keys(metrics).length === 0 && (
                            <p className="text-sm text-foreground-tertiary">
                                Agrega métricas como usuarios, performance, etc.
                            </p>
                        )}
                    </div>

                    {/* Estado */}
                    <div className="rounded-lg border border-border bg-background-secondary p-6">
                        <label htmlFor="status" className="mb-4 block font-semibold">
                            Estado *
                        </label>
                        <select
                            id="status"
                            name="status"
                            required
                            defaultValue={project?.status || "COMPLETED"}
                            disabled={isPending}
                            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                        >
                            <option value="IN_PROGRESS">En Desarrollo</option>
                            <option value="COMPLETED">Completado</option>
                            <option value="ARCHIVED">Archivado</option>
                        </select>
                    </div>

                    {/* Featured */}
                    <div className="rounded-lg border border-border bg-background-secondary p-6">
                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="featured"
                                value="true"
                                defaultChecked={project?.featured}
                                disabled={isPending}
                                className="h-5 w-5 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
                            />
                            <div>
                                <p className="font-semibold">Proyecto Destacado</p>
                                <p className="text-sm text-foreground-secondary">
                                    Aparecerá en la página principal
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </form>
    );
}