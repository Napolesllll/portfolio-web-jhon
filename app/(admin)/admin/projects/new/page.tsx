import { ProjectForm } from "@/components/admin/project-form";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="mb-2 font-display text-3xl font-bold">
                    Nuevo Proyecto
                </h1>
                <p className="text-foreground-secondary">
                    Agrega un nuevo proyecto a tu portfolio
                </p>
            </div>

            <ProjectForm />
        </div>
    );
}