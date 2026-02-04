import { Suspense } from "react";
import { Metadata } from "next";
import { getAllProjects, getAllTechnologies } from "@/lib/queries/projects";
import { ProjectCard } from "@/components/portfolio/project-card";
import { ProjectsFilter } from "@/components/portfolio/projects-filter";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Explora mis proyectos de desarrollo web, casos de estudio y soluciones creadas.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ tech?: string }>;
}) {
  const projects = await getAllProjects();
  const technologies = await getAllTechnologies();
  const params = await searchParams;

  // Filtrar por tecnología si hay query param
  const filteredProjects = params.tech
    ? projects.filter((p) => p.stack.includes(params.tech!))
    : projects;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-display text-4xl font-bold sm:text-5xl">
          Proyectos
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-foreground-secondary">
          Una colección de proyectos que he desarrollado, desde aplicaciones web
          hasta soluciones empresariales.
        </p>
      </div>

      {/* Filter */}
      <ProjectsFilter technologies={technologies} activeTech={params.tech} />

      {/* Projects Grid */}
      <Suspense fallback={<ProjectsLoading />}>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full flex min-h-[400px] items-center justify-center">
              <p className="text-foreground-secondary">
                No hay proyectos con esta tecnología.
              </p>
            </div>
          ) : (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          )}
        </div>
      </Suspense>
    </div>
  );
}

function ProjectsLoading() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-border bg-background-secondary"
        >
          <div className="aspect-video animate-pulse bg-background-tertiary" />
          <div className="p-6">
            <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-background-tertiary" />
            <div className="mb-4 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-background-tertiary" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-background-tertiary" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-16 animate-pulse rounded bg-background-tertiary" />
              <div className="h-6 w-20 animate-pulse rounded bg-background-tertiary" />
              <div className="h-6 w-16 animate-pulse rounded bg-background-tertiary" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}