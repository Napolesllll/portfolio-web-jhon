import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/project-form";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: Props) {
    const { id } = await params;

    if (!id) {
        notFound();
    }

    const project = await prisma.project.findUnique({
        where: { id },
    });

    if (!project) {
        notFound();
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="mb-2 font-display text-3xl font-bold">
                    Editar Proyecto
                </h1>
                <p className="text-foreground-secondary">
                    Modifica la información de tu proyecto
                </p>
            </div>

            <ProjectForm project={project} />
        </div>
    );
}