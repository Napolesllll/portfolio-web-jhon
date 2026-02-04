import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getProjectBySlug, getRelatedProjects } from "@/lib/queries/projects";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/portfolio/project-card";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Proyecto no encontrado" };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
      images: project.coverImage ? [project.coverImage] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(
    project.id,
    project.stack,
    3
  );

  return (
    <article className="container mx-auto max-w-5xl px-4 py-12">
      {/* Back button */}
      <Button asChild variant="ghost" size="sm" className="mb-8">
        <Link href="/projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a proyectos
        </Link>
      </Button>

      {/* Header */}
      <header className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-4">
          {project.featured && (
            <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
              Proyecto Destacado
            </span>
          )}
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${project.status === "COMPLETED"
                ? "bg-green-500/10 text-green-500"
                : project.status === "IN_PROGRESS"
                  ? "bg-yellow-500/10 text-yellow-500"
                  : "bg-gray-500/10 text-gray-500"
              }`}
          >
            {project.status === "COMPLETED"
              ? "🟢 Completado"
              : project.status === "IN_PROGRESS"
                ? "🟡 En desarrollo"
                : "⚫ Archivado"}
          </span>
        </div>

        <h1 className="mb-4 font-display text-4xl font-bold sm:text-5xl">
          {project.title}
        </h1>

        <p className="mb-6 text-xl text-foreground-secondary">
          {project.description}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          {project.liveUrl && (
            <Button asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver Demo
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button asChild variant="secondary">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                Ver Código
              </a>
            </Button>
          )}
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative mb-12 aspect-video overflow-hidden rounded-xl">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Tech Stack */}
      <div className="mb-12">
        <h2 className="mb-4 font-display text-2xl font-bold">
          Stack Tecnológico
        </h2>
        <div className="flex flex-wrap gap-3">
          {project.stack.map((tech: string) => (
            <span
              key={tech}
              className="rounded-lg bg-background-secondary px-4 py-2 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics */}
      {project.metrics && typeof project.metrics === "object" && (
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(project.metrics as Record<string, string>).map(
            ([key, value]) => (
              <div
                key={key}
                className="rounded-xl border border-border bg-background-secondary p-6"
              >
                <p className="mb-2 text-sm font-medium uppercase text-foreground-secondary">
                  {key}
                </p>
                <p className="text-3xl font-bold">{value}</p>
              </div>
            )
          )}
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-neutral dark:prose-invert max-w-none
          prose-headings:font-display prose-headings:font-bold
          prose-h2:mt-12 prose-h2:text-3xl
          prose-h3:mt-8 prose-h3:text-2xl
          prose-p:text-foreground-secondary
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: project.content }}
      />

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="mt-16 border-t border-border pt-12">
          <h2 className="mb-8 font-display text-2xl font-bold">
            Proyectos relacionados
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((relatedProject: typeof relatedProjects[0], index: number) => (
              <ProjectCard
                key={relatedProject.id}
                project={relatedProject}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}