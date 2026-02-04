import Link from "next/link";
import { Plus, Trash2, Edit } from "lucide-react";
import { getAllProjects } from "@/lib/queries/projects";
import { Button } from "@/components/ui/button";
import { DeleteProjectButton } from "@/components/admin/delete-project-button";

export default async function ProjectsPage() {
    const projects = await getAllProjects();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Proyectos</h1>
                <Button asChild>
                    <Link href="/admin/projects/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo Proyecto
                    </Link>
                </Button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full">
                    <thead className="border-b border-border bg-background-secondary">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Título</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Slug</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Destacado</th>
                            <th className="px-6 py-3 text-right text-sm font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id} className="border-b border-border hover:bg-background-secondary">
                                <td className="px-6 py-4 text-sm">{project.title}</td>
                                <td className="px-6 py-4 text-sm text-foreground-secondary">{project.slug}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${project.status === "COMPLETED"
                                            ? "bg-green-100 text-green-800"
                                            : project.status === "IN_PROGRESS"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-gray-100 text-gray-800"
                                        }`}>
                                        {project.status === "COMPLETED"
                                            ? "Completado"
                                            : project.status === "IN_PROGRESS"
                                                ? "En desarrollo"
                                                : "Archivado"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    {project.featured ? (
                                        <span className="text-sm text-primary">★ Destacado</span>
                                    ) : (
                                        <span className="text-sm text-foreground-secondary">-</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/admin/projects/edit/${project.id}`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <DeleteProjectButton projectId={project.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {projects.length === 0 && (
                <div className="rounded-lg border border-dashed border-border p-12 text-center">
                    <p className="text-foreground-secondary mb-4">No hay proyectos aún</p>
                    <Button asChild>
                        <Link href="/admin/projects/new">Crear el primer proyecto</Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
