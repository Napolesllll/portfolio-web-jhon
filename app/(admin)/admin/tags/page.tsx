import { prisma } from "@/lib/prisma";
import { TagForm } from "@/components/admin/tag-form";
import { DeleteTagButton } from "@/components/admin/delete-tag-button";

type Tag = {
    id: string;
    name: string;
    slug: string;
    _count: {
        posts: number;
    };
};

export default async function TagsPage() {
    const tags: Tag[] = await prisma.tag.findMany({
        orderBy: { name: "asc" },
        include: {
            _count: {
                select: { posts: true },
            },
        },
    });

    return (
        <div>
            <div className="mb-8">
                <h1 className="mb-2 font-display text-3xl font-bold">Tags</h1>
                <p className="text-foreground-secondary">
                    Etiquetas para organizar tu contenido
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Formulario */}
                <div className="rounded-xl border border-border bg-background-secondary p-6">
                    <h2 className="mb-6 text-xl font-semibold">Nuevo Tag</h2>
                    <TagForm />
                </div>

                {/* Lista de tags */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Tags Existentes</h2>
                    <div className="flex flex-wrap gap-3">
                        {tags.length === 0 ? (
                            <p className="text-sm text-foreground-secondary">
                                No hay tags aún
                            </p>
                        ) : (
                            tags.map((tag) => (
                                <div
                                    key={tag.id}
                                    className="group flex items-center gap-2 rounded-lg border border-border bg-background-secondary px-4 py-2"
                                >
                                    <span className="font-medium">#{tag.name}</span>
                                    <span className="text-xs text-foreground-tertiary">
                                        ({tag._count.posts})
                                    </span>
                                    <DeleteTagButton
                                        tagId={tag.id}
                                        hasPosts={tag._count.posts > 0}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}