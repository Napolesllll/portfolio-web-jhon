import { Plus, Pencil, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { CategoryForm } from "@/components/admin/category-form";
import { DeleteCategoryButton } from "@/components/admin/delete-category-button";

type Category = {
    id: string;
    name: string;
    slug: string;
    color: string;
    _count: {
        posts: number;
    };
};

export default async function CategoriesPage() {
    const categories: Category[] = await prisma.category.findMany({
        orderBy: { name: "asc" },
        include: {
            _count: {
                select: { posts: true },
            },
        },
    });

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="mb-2 font-display text-3xl font-bold">Categorías</h1>
                    <p className="text-foreground-secondary">
                        Organiza tus posts por categorías
                    </p>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Formulario de crear */}
                <div className="rounded-xl border border-border bg-background-secondary p-6">
                    <h2 className="mb-6 text-xl font-semibold">Nueva Categoría</h2>
                    <CategoryForm />
                </div>

                {/* Lista de categorías */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Categorías Existentes</h2>
                    {categories.length === 0 ? (
                        <p className="text-sm text-foreground-secondary">
                            No hay categorías aún
                        </p>
                    ) : (
                        categories.map((category) => (
                            <div
                                key={category.id}
                                className="flex items-center justify-between rounded-lg border border-border bg-background-secondary p-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className="h-10 w-10 rounded-lg"
                                        style={{ backgroundColor: category.color }}
                                    />
                                    <div>
                                        <h3 className="font-medium">{category.name}</h3>
                                        <p className="text-sm text-foreground-tertiary">
                                            {category._count.posts}{" "}
                                            {category._count.posts === 1 ? "post" : "posts"}
                                        </p>
                                    </div>
                                </div>

                                <DeleteCategoryButton
                                    categoryId={category.id}
                                    hasePosts={category._count.posts > 0}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}