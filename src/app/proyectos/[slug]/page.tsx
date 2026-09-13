import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { ProjectVisual } from "@/components/project-visual";
import { Button } from "@/components/ui/button";
import { getProject, projects } from "@/data/projects";

interface ProjectPageProps {
  params: { slug: string };
}

export function generateStaticParams(): { slug: string }[] {
  return projects.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProject(params.slug);

  if (!project) return {};

  return {
    title: `${project.name} — Josue Sajche`,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-ink">
      <div className="noise" />
      <nav className="container-wide flex h-20 items-center justify-between">
        <Button asChild variant="ghost">
          <Link href="/#trabajo">
            <ArrowLeft className="size-4" /> Volver
          </Link>
        </Button>
        <span className="section-label">{project.index} · Caso de estudio</span>
      </nav>

      <header className="container-wide pb-16 pt-16 md:pb-24 md:pt-28">
        <p className="section-label">
          {project.kind} · {project.year}
        </p>
        <h1 className="display mt-5 text-[clamp(4.2rem,13vw,12rem)] font-semibold leading-[0.75]">
          {project.name}
        </h1>
        <p className="mt-10 max-w-3xl text-xl leading-relaxed text-white/60 md:text-3xl">
          {project.statement}
        </p>
      </header>

      <ProjectVisual
        name={project.name}
        index={project.index}
        visual={project.visual}
        className="min-h-[60svh] md:min-h-[80svh]"
      />

      <article className="container-wide py-24 md:py-36">
        <section className="grid gap-10 border-t border-white/15 pt-9 md:grid-cols-12">
          <p className="section-label md:col-span-3">El proyecto</p>
          <div className="md:col-span-7">
            <p className="display text-3xl leading-tight md:text-5xl">
              {project.summary}
            </p>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/55">
              {project.problem}
            </p>
          </div>
        </section>

        <section className="mt-28 grid gap-10 border-t border-white/15 pt-9 md:grid-cols-12">
          <p className="section-label md:col-span-3">Mi papel</p>
          <div className="md:col-span-7">
            <p className="text-2xl leading-relaxed">{project.role}</p>
            <ol className="mt-12">
              {project.contribution.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[2rem_1fr] gap-4 border-b border-white/15 py-5"
                >
                  <span className="font-mono text-xs text-gold">
                    0{index + 1}
                  </span>
                  <span className="text-lg text-white/75">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mt-28 grid gap-10 border-t border-white/15 pt-9 md:grid-cols-12">
          <p className="section-label md:col-span-3">Tecnología</p>
          <div className="flex flex-wrap gap-x-8 gap-y-4 md:col-span-7">
            {project.stack.map((technology) => (
              <span key={technology} className="display text-3xl text-white/75">
                {technology}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-28 flex flex-wrap gap-4 border-t border-white/15 pt-9">
          <Button asChild>
            <a href={project.repo} target="_blank" rel="noreferrer">
              Ver repositorio del equipo <ArrowUpRight className="size-4" />
            </a>
          </Button>
          {project.demo ? (
            <Button asChild variant="outline">
              <a href={project.demo} target="_blank" rel="noreferrer">
                Ver demo <ArrowUpRight className="size-4" />
              </a>
            </Button>
          ) : null}
        </section>
      </article>
    </main>
  );
}
