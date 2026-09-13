import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { NavOverlay } from "@/components/nav-overlay";
import { ProjectStage } from "@/components/project-stage";
import { profile } from "@/data/profile";
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

  const position = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(position + 1) % projects.length];
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(`Proyecto · ${project.name}`)}`;

  return (
    <main className="min-h-screen bg-ink">
      <div className="noise" />
      <NavOverlay />

      <header className="container-wide pb-14 pt-28 md:pb-24 md:pt-40">
        <Link
          href="/#proyectos"
          className="link-line text-white/60 hover:text-white"
        >
          <ArrowLeft className="size-3.5" /> Todos los proyectos
        </Link>
        <p className="section-label mt-12">
          Proyecto {project.index} · {project.kind} · {project.year}
        </p>
        <h1 className="display mt-5 text-[clamp(3.4rem,11vw,11rem)] font-bold uppercase leading-[0.8]">
          {project.name}
        </h1>
        <p className="serif mt-10 max-w-3xl text-2xl leading-snug text-white/70 md:text-4xl">
          {project.statement}
        </p>
      </header>

      <ProjectStage index={project.index} label={project.name} />

      <article className="container-wide py-24 md:py-36">
        <section className="grid gap-10 border-t border-white/10 pt-9 md:grid-cols-12">
          <p className="section-label md:col-span-3">El proyecto</p>
          <div className="md:col-span-8">
            <p className="display text-3xl font-medium leading-tight md:text-5xl">
              {project.summary}
            </p>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/55">
              {project.problem}
            </p>
          </div>
        </section>

        <section className="mt-28 grid gap-10 border-t border-white/10 pt-9 md:grid-cols-12">
          <p className="section-label md:col-span-3">Mi papel</p>
          <div className="md:col-span-8">
            <p className="text-2xl leading-relaxed text-white/85">{project.role}</p>
            <ol className="mt-12">
              {project.contribution.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[2rem_1fr] gap-4 border-b border-white/10 py-5"
                >
                  <span className="font-mono text-xs text-gold">0{index + 1}</span>
                  <span className="text-lg text-white/75">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mt-28 grid gap-10 border-t border-white/10 pt-9 md:grid-cols-12">
          <p className="section-label md:col-span-3">Tecnologías</p>
          <div className="flex flex-wrap gap-x-8 gap-y-4 md:col-span-8">
            {project.stack.map((technology) => (
              <span key={technology} className="display text-3xl uppercase text-white/75">
                {technology}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-28 flex flex-wrap items-center gap-8 border-t border-white/10 pt-9">
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center gap-3 border border-white/30 px-6 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-white hover:text-black"
          >
            Repositorio del equipo <ArrowUpRight className="size-4" />
          </a>
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="link-line text-white/70 hover:text-white"
            >
              Ver demo <ArrowUpRight className="size-3.5" />
            </a>
          ) : null}
          <a href={mailto} className="link-line text-gold">
            ¿Necesitas algo similar? Escríbeme <ArrowUpRight className="size-3.5" />
          </a>
        </section>
      </article>

      {/* Siguiente build */}
      <Link
        href={`/proyectos/${next.slug}`}
        className="group block border-t border-white/10 bg-[#0b0b0b] py-20 md:py-28"
      >
        <div className="container-wide flex items-end justify-between gap-6">
          <div>
            <span className="section-label">Siguiente proyecto · {next.index}</span>
            <p className="display mt-4 text-[clamp(2.6rem,8vw,8rem)] font-bold uppercase leading-[0.85] transition-transform duration-700 group-hover:translate-x-3">
              {next.name}
            </p>
          </div>
          <ArrowRight className="mb-3 size-8 shrink-0 text-white/40 transition-colors group-hover:text-gold md:size-12" />
        </div>
      </Link>

      <footer className="container-wide flex flex-col gap-3 py-8 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Josue Sajche · Desarrollador full stack e IA</span>
        <a href={`mailto:${profile.email}`} className="hover:text-gold">
          {profile.email}
        </a>
      </footer>
    </main>
  );
}
