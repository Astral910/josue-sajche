"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  CornerDownRight,
  Mail,
} from "lucide-react";

import { MotionShell } from "@/components/motion/motion-shell";
import { HeroVisual } from "@/components/motion/hero-visual";
import { Reveal } from "@/components/motion/reveal";
import { ProjectVisual } from "@/components/project-visual";
import { Button } from "@/components/ui/button";
import {
  achievements,
  capabilities,
  goals,
  milestones,
  profile,
} from "@/data/profile";
import { projects } from "@/data/projects";

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/15 backdrop-blur-lg">
      <div className="container-wide flex h-16 items-center justify-between">
        <a href="#inicio" className="display text-lg font-bold tracking-[-0.04em]">
          JS<span className="text-gold">/</span>
        </a>
        <nav
          className="hidden items-center gap-8 font-mono text-[10px] uppercase tracking-[0.16em] text-white/65 md:flex"
          aria-label="Navegación principal"
        >
          <a className="transition-colors hover:text-white" href="#trabajo">
            Trabajo
          </a>
          <a className="transition-colors hover:text-white" href="#trayectoria">
            Trayectoria
          </a>
          <a className="transition-colors hover:text-white" href="#ahora">
            Ahora
          </a>
        </nav>
        <Button asChild variant="outline" className="h-9 px-4 text-xs">
          <a href={`mailto:${profile.email}`}>
            Hablemos <ArrowUpRight className="size-3.5" />
          </a>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="inicio"
      className="relative z-10 flex min-h-[100svh] flex-col justify-end overflow-hidden pb-7 pt-24 md:pb-10"
    >
      <div className="container-wide">
        <div className="mb-8 flex items-end justify-between">
          <p className="section-label max-w-44 leading-relaxed text-white/70">
            Desarrollador de producto
            <br />
            Guatemala · 2026
          </p>
          <p className="hidden max-w-64 text-right text-sm leading-relaxed text-white/65 sm:block">
            Full stack, móvil e IA aplicada a problemas que merecen una mejor
            respuesta.
          </p>
        </div>
        <h1 className="display w-full text-[clamp(3.3rem,15vw,13rem)] font-bold uppercase leading-[0.74] text-[#f3f0ea] sm:text-[clamp(4.2rem,13.4vw,13rem)]">
          Josue
          <span className="block text-right">Sajche</span>
        </h1>
        <div className="mt-8 flex items-end justify-between border-t border-white/20 pt-5">
          <p className="max-w-lg text-base leading-relaxed text-white/78 md:text-xl">
            {profile.tagline}
          </p>
          <a
            href="#manifiesto"
            aria-label="Descubrir el portafolio"
            className="grid size-11 place-items-center border border-white/25 transition-colors hover:bg-white hover:text-black"
          >
            <ArrowDown className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section
      id="manifiesto"
      className="relative z-10 bg-[#f0ece3] py-28 text-ink md:py-44"
    >
      <div className="container-wide grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <span className="section-label !text-black/50">01 · Manifiesto</span>
        </Reveal>
        <Reveal className="md:col-span-9">
          <p className="display text-[clamp(2.1rem,5.1vw,5.6rem)] font-medium leading-[0.98]">
            No me interesa construir tecnología para marcar una casilla.
            <span className="text-black/35">
              {" "}
              Me interesa entender el problema, tensar la idea y hacer que el
              producto se sienta inevitable.
            </span>
          </p>
          <div className="mt-16 grid gap-7 border-t border-black/20 pt-7 md:grid-cols-2">
            <p className="text-base leading-relaxed text-black/60">
              {profile.manifesto}
            </p>
            <p className="md:pl-10">
              <span className="font-mono text-xs uppercase tracking-[0.16em]">
                Actualmente
              </span>
              <span className="mt-3 block text-xl">
                Pasante en Hyper Reality Company y estudiante de informática en
                Kinal.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SelectedWork() {
  return (
    <section id="trabajo" className="relative z-10 bg-ink py-28 md:py-40">
      <div className="container-wide">
        <Reveal className="mb-20 flex items-end justify-between">
          <div>
            <span className="section-label">02 · Trabajo seleccionado</span>
            <h2 className="display mt-5 text-6xl font-semibold uppercase leading-none md:text-8xl">
              Cinco pruebas,
              <span className="outline-text block">una historia.</span>
            </h2>
          </div>
          <p className="hidden max-w-64 text-sm leading-relaxed text-white/50 md:block">
            No son ejercicios agrupados. Son decisiones, colaboración y
            aprendizajes que dejaron evidencia.
          </p>
        </Reveal>

        <div>
          {projects.map((project, position) => (
            <Reveal
              key={project.slug}
              className="group grid gap-6 border-t border-white/15 py-10 md:grid-cols-12 md:items-center md:py-14"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-xs text-white/40">
                  {project.index}
                </span>
              </div>
              <div className="md:col-span-5">
                <p className="section-label mb-4">
                  {project.kind} · {project.year}
                </p>
                <h3 className="display text-4xl font-semibold leading-none transition-transform duration-500 group-hover:translate-x-2 md:text-6xl">
                  {project.name}
                </h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white/55">
                  {project.statement}
                </p>
                <Link
                  href={`/proyectos/${project.slug}`}
                  className="mt-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-gold"
                >
                  Ver caso <CornerDownRight className="size-4" />
                </Link>
              </div>
              <div className="md:col-span-6">
                <ProjectVisual
                  name={project.name}
                  index={`0${position + 1}`}
                  visual={project.visual}
                  className="transition-transform duration-700 group-hover:scale-[0.985]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section
      id="trayectoria"
      className="relative z-10 overflow-hidden bg-gold py-28 text-ink md:py-40"
    >
      <div className="container-wide">
        <Reveal className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="section-label !text-black/55">
              03 · Trayectoria
            </span>
            <h2 className="display mt-5 text-6xl font-semibold uppercase leading-[0.85] md:text-8xl">
              De cero
              <br />a ahora.
            </h2>
          </div>
          <p className="max-w-lg self-end text-lg leading-relaxed text-black/65 md:col-span-6 md:col-start-7">
            No es una línea recta. Es una secuencia de retos cada vez más
            reales: competir, colaborar, operar y aprender a responder por lo
            construido.
          </p>
        </Reveal>

        <div className="mt-20 border-t border-black/25">
          {milestones.map((milestone, index) => (
            <Reveal
              key={milestone.title}
              className="grid gap-5 border-b border-black/25 py-9 md:grid-cols-12 md:items-start"
              delay={index * 0.05}
            >
              <span className="font-mono text-xs md:col-span-2">
                {milestone.year}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/50 md:col-span-2">
                {milestone.label}
              </span>
              <h3 className="display text-3xl font-semibold leading-tight md:col-span-4">
                {milestone.title}
              </h3>
              <p className="max-w-md leading-relaxed text-black/60 md:col-span-4">
                {milestone.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="relative z-10 bg-[#0b0b0b] py-28 md:py-40">
      <div className="container-wide grid gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <span className="section-label">04 · Capacidades</span>
          <h2 className="display mt-5 text-5xl font-semibold uppercase leading-[0.9] md:text-7xl">
            Pienso en sistemas.
            <span className="outline-text block">Construyo experiencias.</span>
          </h2>
        </Reveal>
        <div className="md:col-span-7 md:col-start-6">
          {capabilities.map((capability) => (
            <Reveal
              key={capability.number}
              className="grid gap-4 border-t border-white/15 py-8 sm:grid-cols-[3rem_1fr]"
            >
              <span className="font-mono text-xs text-gold">
                {capability.number}
              </span>
              <div>
                <h3 className="display text-3xl font-medium">
                  {capability.title}
                </h3>
                <p className="mt-3 max-w-xl leading-relaxed text-white/55">
                  {capability.text}
                </p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
                  {capability.tools}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function NowAndGoals() {
  return (
    <section id="ahora" className="relative z-10 bg-[#f0ece3] py-28 text-ink md:py-40">
      <div className="container-wide">
        <Reveal className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="section-label !text-black/50">05 · Ahora</span>
          </div>
          <div className="md:col-span-9">
            <h2 className="display max-w-[15ch] text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.88]">
              Estoy construyendo la distancia entre quien soy y quien quiero
              llegar a ser.
            </h2>
          </div>
        </Reveal>
        <div className="mt-20 grid gap-10 border-t border-black/20 pt-8 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.14em]">
              La siguiente versión
            </p>
          </Reveal>
          <div className="md:col-span-8 md:col-start-5">
            {goals.map((goal, index) => (
              <Reveal
                key={goal}
                className="grid grid-cols-[2rem_1fr] gap-4 border-b border-black/15 py-6"
              >
                <span className="font-mono text-xs text-black/35">
                  0{index + 1}
                </span>
                <p className="text-xl leading-snug md:text-2xl">{goal}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section className="relative z-10 overflow-hidden border-y border-white/15 bg-ink py-8">
      <div className="flex w-max animate-[marquee_26s_linear_infinite] items-center">
        {[...achievements, ...achievements].map((achievement, index) => (
          <p
            key={`${achievement}-${index}`}
            className="display flex items-center text-3xl uppercase text-white/85 md:text-5xl"
          >
            {achievement}
            <span className="mx-8 text-gold">/</span>
          </p>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}

function Contact() {
  return (
    <footer className="relative z-10 min-h-[90svh] bg-ink pb-8 pt-28 md:pt-40">
      <div className="container-wide flex min-h-[70svh] flex-col justify-between">
        <Reveal>
          <span className="section-label">06 · Contacto</span>
          <p className="display mt-8 max-w-[13ch] text-[clamp(3.4rem,9vw,9rem)] font-semibold uppercase leading-[0.82]">
            Hagamos que la idea merezca existir.
          </p>
          <Button asChild size="lg" className="mt-12">
            <a href={`mailto:${profile.email}`}>
              <Mail className="size-4" /> Escríbeme
            </a>
          </Button>
        </Reveal>
        <div className="mt-20 grid gap-7 border-t border-white/15 pt-6 text-sm md:grid-cols-3">
          <p className="text-white/45">
            {profile.location}
            <br />
            Disponible para colaborar
          </p>
          <div className="flex gap-5 md:justify-center">
            <a className="hover:text-gold" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="hover:text-gold" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
          <p className="md:text-right">© {new Date().getFullYear()} Josue Sajche</p>
        </div>
      </div>
    </footer>
  );
}

export function HomeExperience() {
  return (
    <MotionShell>
      <HeroVisual />
      <div className="noise" />
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <SelectedWork />
        <Journey />
        <Capabilities />
        <NowAndGoals />
        <Achievements />
      </main>
      <Contact />
    </MotionShell>
  );
}
