import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug, getRelatedProjects } from "@/lib/queries/projects";
import { Button } from "@/components/ui/button";
import { ProjectHero } from "@/components/portfolio/project-hero";
import { ProjectMetrics } from "@/components/portfolio/project-metrics";
import { ProjectTechStack } from "@/components/portfolio/project-tech-stack";
import { ProjectContentWrapper } from "@/components/portfolio/project-content-wrapper";
import { ProjectRelatedProjects } from "@/components/portfolio/project-related-projects";

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
    <>
      {/* Header Section with Hero */}
      <div className="relative overflow-hidden mb-20">
        {/* Background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950" />

        {/* Main Container */}
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="ghost" size="sm" className="group">
              <Link href="/projects" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Volver a Proyectos
              </Link>
            </Button>
          </div>

          {/* Hero Section */}
          <ProjectHero
            title={project.title}
            description={project.description}
            featured={project.featured}
            status={project.status}
            liveUrl={project.liveUrl}
            githubUrl={project.githubUrl}
          />
        </div>
      </div>

      {/* Cover Image - Full Width */}
      <div className="relative h-96 sm:h-[500px] overflow-hidden mb-20 -mx-4 sm:mx-0 sm:rounded-2xl">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
      </div>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 pb-20 space-y-20">
        {/* Tech Stack */}
        <ProjectTechStack stack={project.stack} />

        {/* Metrics */}
        <ProjectMetrics metrics={project.metrics as Record<string, string> | undefined} />

        {/* Content */}
        <div>
          <ProjectContentWrapper>
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
          </ProjectContentWrapper>
        </div>

        {/* Related Projects */}
        <ProjectRelatedProjects projects={relatedProjects} />
      </article>
    </>
  );
}