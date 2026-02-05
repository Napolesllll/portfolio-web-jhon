import { Suspense } from "react";
import { Metadata } from "next";
import { getAllProjects, getAllTechnologies } from "@/lib/queries/projects";
import { ProjectCard } from "@/components/portfolio/project-card";
import { ProjectsHeader } from "@/components/portfolio/projects-header";

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
    ? projects.filter((p: typeof projects[0]) => p.stack.includes(params.tech!))
    : projects;

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20" />
      </div>

      {/* Decorative animated orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto max-w-6xl px-4 py-12 relative space-y-20">
        {/* Header Section */}
        <div className="relative">
          <ProjectsHeader />
        </div>

        {/* Projects Grid */}
        <Suspense fallback={<ProjectsLoading />}>
          <ProjectsGrid projects={filteredProjects} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProjectsGrid({
  projects,
}: {
  projects: Array<any>;
}) {
  if (projects.length === 0) {
    return (
      <div className="col-span-full flex min-h-[400px] items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">🎨</div>
          <p className="text-lg text-white font-semibold">
            No hay proyectos con esta tecnología.
          </p>
          <p className="text-sm text-gray-400">
            Intenta con otro filtro o explora todos los proyectos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project: typeof projects[0], index: number) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}

function ProjectsLoading() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md"
        >
          <div className="aspect-video animate-pulse bg-gradient-to-r from-white/10 to-white/5" />
          <div className="p-6 space-y-4">
            <div className="h-6 w-3/4 animate-pulse rounded bg-gradient-to-r from-white/10 to-white/5" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-gradient-to-r from-white/10 to-white/5" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-gradient-to-r from-white/10 to-white/5" />
            </div>
            <div className="flex gap-2 pt-4">
              <div className="h-6 w-16 animate-pulse rounded bg-gradient-to-r from-white/10 to-white/5" />
              <div className="h-6 w-20 animate-pulse rounded bg-gradient-to-r from-white/10 to-white/5" />
              <div className="h-6 w-16 animate-pulse rounded bg-gradient-to-r from-white/10 to-white/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}