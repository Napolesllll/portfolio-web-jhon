"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { TechBadge } from "./tech-badge";

type ProjectsFilterProps = {
  technologies: string[];
  activeTech?: string;
};

export function ProjectsFilter({ technologies, activeTech }: ProjectsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleFilter(tech: string) {
    const params = new URLSearchParams(searchParams);

    if (activeTech === tech) {
      params.delete("tech");
    } else {
      params.set("tech", tech);
    }

    router.push(`/projects?${params.toString()}`);
  }

  function clearFilter() {
    router.push("/projects");
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-foreground-secondary">
        Filtrar por:
      </span>
      <TechBadge
        tech="Todos"
        active={!activeTech}
        onClick={clearFilter}
      />
      {technologies.map((tech) => (
        <TechBadge
          key={tech}
          tech={tech}
          active={activeTech === tech}
          onClick={() => handleFilter(tech)}
        />
      ))}
    </div>
  );
}