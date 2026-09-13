"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";

import { MotionShell, scrollToTarget } from "@/components/motion/motion-shell";
import { Reveal } from "@/components/motion/reveal";
import { NavOverlay } from "@/components/nav-overlay";
import { Preloader } from "@/components/preloader";
import { ProjectVisual } from "@/components/project-visual";
import { achievements, goals, milestones, profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { approach, hero, services, stack } from "@/data/site";
import { asset } from "@/lib/asset";

// Los canvas de Three.js solo existen en el navegador.
const Cordillera = dynamic(
  () => import("@/components/three/cordillera").then((module) => module.Cordillera),
  { ssr: false },
);
const SpotlightLandmark = dynamic(
  () => import("@/components/three/spotlight-landmark").then((module) => module.SpotlightLandmark),
  { ssr: false },
);

const mailto = `mailto:${profile.email}?subject=${encodeURIComponent("Iniciar un proyecto")}`;

function ProjectLink({ label = "Iniciar proyecto", className = "" }: { label?: string; className?: string }) {
  return (
    <a href={mailto} className={`link-line ${className}`}>
      {label} <ArrowUpRight className="size-3.5" />
    </a>
  );
}

/* ------------------------------------------------------------------------ */
/* Hero: cordillera 3D + titulares + erupción con el scroll                   */
/* ------------------------------------------------------------------------ */

function Hero({ started }: { started: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const eruptionCaptionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);

  // El scroll del hero dispara la erupción, muestra la frase y desvanece la escena.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const wrap = canvasWrapRef.current;
    const caption = eruptionCaptionRef.current;
    if (!section || !wrap || !caption) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        scrollRef.current = progress;
        // Los datos aparecen en plena erupción y se retiran antes del final.
        const rise = Math.min(1, Math.max(0, (progress - 0.45) / 0.2));
        const fall = Math.min(1, Math.max(0, (progress - 0.9) / 0.1));
        caption.style.opacity = String(rise * (1 - fall));
        caption.style.transform = `translateY(${(1 - rise) * 24}px)`;
      },
    });

    // La escena permanece hasta que la siguiente sección la cubre; después se
    // oculta para no seguir renderizando en segundo plano.
    const exit = ScrollTrigger.create({
      trigger: section,
      start: "bottom bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        wrap.style.opacity = String(1 - self.progress * 0.6);
        wrap.style.visibility = self.progress >= 1 ? "hidden" : "visible";
      },
    });

    return () => {
      trigger.kill();
      exit.kill();
    };
  }, []);

  // Titulares que suben con la cortina del preloader.
  useEffect(() => {
    if (!started || !sectionRef.current) return;
    const lines = sectionRef.current.querySelectorAll<HTMLElement>(".hero-line");
    const animation = gsap.fromTo(
      lines,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.09, delay: 0.5, ease: "power4.out" },
    );
    return () => {
      animation.kill();
    };
  }, [started]);

  return (
    <>
      <div
        ref={canvasWrapRef}
        className="fixed inset-0 z-0 h-[100svh] bg-ink"
        aria-hidden="true"
      >
        <Cordillera started={started} scrollRef={scrollRef} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-ink/80 to-transparent" />
      </div>

      <section ref={sectionRef} id="inicio" className="relative z-10">
        {/* Primera pantalla: titulares */}
        <div className="flex min-h-[100svh] flex-col justify-between pb-8 pt-24 md:pt-28">
          <div className="container-wide">
            <div className="overflow-hidden">
              <p className="hero-line mx-auto max-w-xl text-center text-base leading-snug text-white/65 md:text-lg">
                {hero.statement}
              </p>
            </div>
          </div>

          <div className="container-wide">
          <div className="overflow-hidden">
            <h2 className="hero-line display text-sm font-semibold uppercase tracking-[0.12em] text-white/70 md:text-base">
              {hero.eyebrow}
              <span className="block text-white/40">{hero.eyebrowSecond}</span>
            </h2>
          </div>
          <div className="mt-6 overflow-hidden">
            <h1 className="hero-line display text-[clamp(2.5rem,6.6vw,7.8rem)] font-bold uppercase leading-[0.86] tracking-[-0.05em]">
              {hero.titleLine1}
              <span className="block">{hero.titleLine2}</span>
            </h1>
          </div>
          <div className="mt-8 flex flex-col gap-6 border-t border-white/15 pt-6 md:flex-row md:items-end md:justify-between">
            <div className="overflow-hidden">
              <p className="hero-line max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                {hero.subtitle}
              </p>
            </div>
            <div className="hero-line flex items-center gap-6">
              <ProjectLink />
              <button
                type="button"
                onClick={() => scrollToTarget("#sobre-mi")}
                aria-label="Ver más"
                className="grid size-11 place-items-center border border-white/25 transition-colors hover:bg-white hover:text-black"
              >
                <ArrowDown className="size-4" />
              </button>
            </div>
          </div>
          </div>
        </div>

        {/* Recorrido de la erupción: la escena queda fija mientras se hace scroll */}
        <div className="relative h-[130svh]">
          <div className="sticky top-0 flex h-[100svh] items-end justify-center pb-16 md:pb-20">
            <div ref={eruptionCaptionRef} className="container-wide opacity-0">
              <dl className="grid gap-6 border-t border-white/15 pt-6 md:grid-cols-3 md:gap-8">
                {hero.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="display text-4xl font-bold leading-none md:text-6xl">{fact.value}</dt>
                    <dd className="section-label mt-3">{fact.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------------ */
/* Sobre mí: foto + presentación + marquee de tecnologías                     */
/* ------------------------------------------------------------------------ */

function About() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const image = imageRef.current;
    if (!image) return;
    const animation = gsap.fromTo(
      image.firstElementChild,
      { yPercent: -12, scale: 1.15 },
      {
        yPercent: 12,
        scale: 1.15,
        ease: "none",
        scrollTrigger: { trigger: image, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  return (
    <section id="sobre-mi" className="relative z-10 bg-ink pt-24 md:pt-36">
      {/* Fundido suave sobre la cordillera al entrar en esta sección */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-48 h-48 bg-gradient-to-b from-transparent to-ink"
        aria-hidden="true"
      />
      <div className="container-wide grid gap-12 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-5">
          <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden bg-[#0b0b0b]">
            <div className="absolute inset-0">
              <Image
                src={asset("/josue-hero.png")}
                alt="Josue Sajche"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-[60%_center] grayscale-[0.2]"
              />
            </div>
            <span className="section-label absolute bottom-4 left-4">{profile.shortName}</span>
          </div>
        </Reveal>

        <div className="flex flex-col justify-between md:col-span-6 md:col-start-7">
          <Reveal>
            <span className="section-label">Sobre mí</span>
            <h2 className="display mt-6 text-[clamp(2.2rem,4.6vw,4.6rem)] font-semibold uppercase leading-[0.92]">
              Desarrollador full stack. Diseño, código e IA en un mismo flujo.
            </h2>
          </Reveal>
          <Reveal className="mt-12">
            {profile.about.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`max-w-lg text-lg leading-relaxed text-white/60 ${index > 0 ? "mt-6" : ""}`}
              >
                {paragraph}
              </p>
            ))}
            <ProjectLink className="mt-10 text-gold" label="Hablemos de tu proyecto" />
          </Reveal>
        </div>
      </div>

      {/* Marcas → tecnologías con las que trabajo */}
      <div className="mt-24 border-y border-white/10 py-6 md:mt-32">
        <div className="marquee-track" aria-label="Tecnologías">
          {[...stack, ...stack].map((technology, index) => (
            <span
              key={`${technology}-${index}`}
              className="display flex items-center text-2xl font-medium uppercase text-white/55 md:text-3xl"
            >
              {technology}
              <Plus className="mx-8 size-4 text-gold/70" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Cómo trabajo: 3 pasos con objeto 3D giratorio                              */
/* ------------------------------------------------------------------------ */

function Approach() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const list = listRef.current;
    if (!list) return;

    const steps = list.querySelectorAll<HTMLElement>(".approach-step");
    const triggers = Array.from(steps).map((step, index) =>
      ScrollTrigger.create({
        trigger: step,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () => setActive(index),
        onEnterBack: () => setActive(index),
      }),
    );

    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);

  const current = approach[active] ?? approach[0];

  return (
    <section id="enfoque" className="relative z-10 bg-ink">
      <div className="container-wide pt-24 md:pt-32">
        <Reveal>
          <span className="section-label">Cómo trabajo</span>
          <h2 className="display mt-6 max-w-3xl text-[clamp(2.2rem,4.6vw,4.6rem)] font-semibold uppercase leading-[0.92]">
            Un proceso simple, en tres pasos.
          </h2>
        </Reveal>
      </div>
      <div className="container-wide grid md:grid-cols-2">
        {/* En móvil el objeto se ancla abajo; en escritorio ocupa la columna izquierda. */}
        <div className="sticky bottom-0 z-20 order-2 h-[40svh] md:bottom-auto md:top-0 md:order-1 md:h-screen">
          <div className="relative h-full w-full bg-gradient-to-t from-ink via-ink via-75% to-ink/0 md:bg-none">
            <SpotlightLandmark kind={current.landmark} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-1 pb-6">
              <span className="font-mono text-xs text-white/50">
                <span className="text-white">{current.index}</span> / 0{approach.length}
              </span>
              <span className="section-label">{current.landmarkName}</span>
            </div>
          </div>
        </div>

        <div ref={listRef} className="relative z-10 order-1 md:order-2">
          {approach.map((step) => (
            <article
              key={step.index}
              className="approach-step flex min-h-[60svh] flex-col justify-start border-t border-white/10 pb-24 pt-14 md:min-h-screen md:justify-center md:border-t-0 md:py-16 md:pl-12"
            >
              <span className="font-mono text-xs text-white/40">
                {step.index} / 0{approach.length}
              </span>
              <h3 className="display mt-6 text-[clamp(2.6rem,6vw,6rem)] font-semibold uppercase leading-none">
                {step.title}
              </h3>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-white/60">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Servicios                                                                  */
/* ------------------------------------------------------------------------ */

function Services() {
  return (
    <section id="servicios" className="relative z-10 bg-ink py-28 md:py-40">
      <div className="container-wide">
        <Reveal className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <span className="section-label">Servicios</span>
            <h2 className="display mt-6 text-[clamp(2.2rem,4.8vw,5rem)] font-semibold leading-[0.95]">
              Qué puedo construir para tu negocio.
            </h2>
          </div>
          <div className="self-end md:col-span-4">
            <p className="text-base leading-relaxed text-white/60">
              Desde un MVP para validar una idea hasta una app móvil o una integración con IA en un
              sistema que ya existe. Trabajo por proyecto, con alcance y precio definidos antes de
              empezar.
            </p>
            <ProjectLink className="mt-8 text-gold" label="Pedir una propuesta" />
          </div>
        </Reveal>

        <div className="mt-20 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal
              key={service.title}
              as="article"
              delay={(index % 3) * 0.06}
              className="service-card flex min-h-[20rem] flex-col justify-between border-b border-r border-white/10 p-7 md:min-h-[24rem] md:p-9"
            >
              <span className="section-label !text-current opacity-60">Servicio</span>
              <div>
                <h3 className="display text-3xl font-semibold md:text-4xl">{service.title}</h3>
                <p className="mt-4 text-base leading-relaxed opacity-70">{service.text}</p>
                <ProjectLink className="mt-8" label="Cotizar" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Proyectos destacados                                                       */
/* ------------------------------------------------------------------------ */

function FeaturedProjects() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const featured = projects.slice(0, 3);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = cardsRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(".featured-card");
    const animations = Array.from(cards).map((card, index) =>
      gsap.fromTo(
        card,
        { yPercent: index === 1 ? 14 : -6 },
        {
          yPercent: index === 1 ? -14 : 6,
          ease: "none",
          scrollTrigger: { trigger: container, start: "top bottom", end: "bottom top", scrub: true },
        },
      ),
    );

    return () => {
      animations.forEach((animation) => {
        animation.scrollTrigger?.kill();
        animation.kill();
      });
    };
  }, []);

  return (
    <section id="proyectos" className="relative z-10 overflow-hidden bg-ink py-24 md:py-36">
      <div className="container-wide">
        <Reveal>
          <span className="section-label">Trabajo seleccionado</span>
          <p className="display mt-4 text-[clamp(3.6rem,13vw,14rem)] font-bold uppercase leading-[0.8]">
            <span className="outline-text">Proyectos</span>
          </p>
        </Reveal>

        <div ref={cardsRef} className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/proyectos/${project.slug}`}
              className="featured-card group block"
            >
              <ProjectVisual
                name={project.name}
                index={project.index}
                visual={project.visual}
                className="min-h-[18rem] transition-transform duration-700 group-hover:scale-[0.985] md:min-h-[26rem]"
              />
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="display text-2xl font-semibold">{project.name}</h3>
                  <p className="section-label mt-1">{project.kind}</p>
                </div>
                <ArrowUpRight className="mt-1 size-5 shrink-0 text-white/50 transition-colors group-hover:text-gold" />
              </div>
            </Link>
          ))}
        </div>

        <Reveal className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <h2 className="display text-[clamp(3.6rem,13vw,14rem)] font-bold uppercase leading-[0.8] md:col-span-8">
            Casos reales
          </h2>
          <p className="max-w-sm text-lg leading-relaxed text-white/60 md:col-span-4 md:pb-4">
            Una plataforma con IA que ganó una hackathon, videollamadas con traducción de señas en
            tiempo real y un sistema bancario con microservicios. Cada uno con su caso de estudio.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Todos los proyectos + disponibilidad                                       */
/* ------------------------------------------------------------------------ */

function Builds() {
  return (
    <section id="builds" className="relative z-10 bg-[#0b0b0b] py-24 md:py-36">
      <div className="container-wide">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="relative flex min-h-[26rem] flex-col justify-end overflow-hidden border border-white/10 p-8 md:min-h-[34rem] md:p-10">
            <ProjectVisual
              name="Builds"
              index="05"
              visual="steel"
              className="!absolute inset-0 min-h-0 opacity-70"
            />
            <div className="relative">
              <h2 className="display text-4xl font-semibold uppercase leading-none md:text-6xl">
                Todos los proyectos
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/65">
                Cinco proyectos entre hackathons, trabajo en equipo y sistemas completos. Cada uno
                con el problema, mi rol, lo que construí y el repositorio.
              </p>
              <button
                type="button"
                onClick={() => scrollToTarget("#lista-builds")}
                className="link-line mt-8 text-gold"
              >
                Ver la lista <ArrowDown className="size-3.5" />
              </button>
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            className="relative flex min-h-[26rem] flex-col justify-end overflow-hidden border border-white/10 p-8 md:min-h-[34rem] md:p-10"
          >
            <ProjectVisual
              name="Stock"
              index="26"
              visual="amber"
              className="!absolute inset-0 min-h-0 opacity-70"
            />
            <div className="relative">
              <h2 className="display text-4xl font-semibold uppercase leading-none md:text-6xl">
                Disponible para proyectos
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/65">
                Tomo proyectos freelance con alcance definido: MVPs, aplicaciones web y móviles e
                integraciones con IA. Cuéntame tu idea y te propongo alcance, tiempos y precio.
              </p>
              <ProjectLink className="mt-8 text-gold" label="Escribirme" />
            </div>
          </Reveal>
        </div>

        <div id="lista-builds" className="mt-28 border-t border-white/10">
          {projects.map((project) => (
            <Reveal key={project.slug} as="article">
              <Link
                href={`/proyectos/${project.slug}`}
                className="group grid gap-3 border-b border-white/10 py-7 md:grid-cols-12 md:items-center md:py-9"
              >
                <span className="font-mono text-xs text-white/40 md:col-span-1">{project.index}</span>
                <h3 className="display text-3xl font-semibold transition-transform duration-500 group-hover:translate-x-2 md:col-span-4 md:text-5xl">
                  {project.name}
                </h3>
                <p className="section-label md:col-span-3">{project.kind}</p>
                <p className="hidden text-sm text-white/55 md:col-span-3 md:block">
                  {project.statement}
                </p>
                <span className="flex justify-end md:col-span-1">
                  <ArrowUpRight className="size-5 text-white/40 transition-colors group-hover:text-gold" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Trayectoria, metas y logros                                                */
/* ------------------------------------------------------------------------ */

function Trajectory() {
  return (
    <section id="trayectoria" className="relative z-10 bg-ink py-24 md:py-36">
      <div className="container-wide">
        <Reveal className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="section-label">Trayectoria</span>
            <h2 className="display mt-6 text-[clamp(2.6rem,6vw,6rem)] font-semibold uppercase leading-[0.9]">
              De hackathons a producto real.
            </h2>
          </div>
          <p className="max-w-md self-end text-lg leading-relaxed text-white/60 md:col-span-5 md:col-start-8">
            Empecé compitiendo, seguí construyendo en equipo y hoy trabajo en producto en
            desarrollo. Cada etapa sumó alcance y responsabilidad.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {milestones.map((milestone, index) => (
            <Reveal
              key={milestone.title}
              as="article"
              delay={index * 0.06}
              className="flex min-h-[20rem] flex-col justify-between border border-white/10 p-7 md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gold">{milestone.year}</span>
                <span className="section-label">{milestone.label}</span>
              </div>
              <div>
                <h3 className="display text-2xl font-semibold leading-tight md:text-3xl">
                  {milestone.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/60">{milestone.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-12 border-t border-white/10 pt-10 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <span className="section-label">Logros</span>
            <ul className="mt-6">
              {achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="display flex items-center gap-4 border-b border-white/10 py-4 text-xl md:text-2xl"
                >
                  <span className="size-1.5 shrink-0 bg-gold" aria-hidden="true" />
                  {achievement}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="md:col-span-5 md:col-start-8">
            <span className="section-label">Metas</span>
            <ol className="mt-6">
              {goals.map((goal, index) => (
                <li
                  key={goal}
                  className="grid grid-cols-[2rem_1fr] gap-4 border-b border-white/10 py-4"
                >
                  <span className="font-mono text-xs text-white/40">0{index + 1}</span>
                  <p className="text-lg leading-snug text-white/80">{goal}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* CTA final + pie                                                            */
/* ------------------------------------------------------------------------ */

function Closing() {
  return (
    <footer id="contacto" className="relative z-10 bg-ink pb-8 pt-28 md:pt-44">
      <div className="container-wide">
        <Reveal className="text-center">
          <p className="text-lg text-white/60 md:text-2xl">¿Tienes un proyecto en mente?</p>
          <h2 className="display mt-4 text-[clamp(3rem,11vw,12rem)] font-bold uppercase leading-[0.82]">
            Hablemos
          </h2>
          <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-white/60 md:text-lg">
            Escríbeme con una descripción corta de lo que necesitas y te respondo con una
            propuesta de alcance, tiempos y precio.
          </p>
          <a
            href={mailto}
            className="mt-12 inline-flex h-14 items-center gap-3 border border-white/30 px-8 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-white hover:text-black"
          >
            Escribir a Josue <ArrowUpRight className="size-4" />
          </a>
        </Reveal>

        <div className="mt-28 grid gap-8 border-t border-white/10 pt-6 text-sm md:grid-cols-4 md:items-start">
          <div>
            <p className="section-label">Ubicación</p>
            <p className="mt-2 text-white/70">{profile.location}</p>
          </div>
          <div>
            <p className="section-label">Correo</p>
            <a href={`mailto:${profile.email}`} className="mt-2 block text-white/70 hover:text-gold">
              {profile.email}
            </a>
          </div>
          <div>
            <p className="section-label">Redes</p>
            <div className="mt-2 flex gap-5 text-white/70">
              <a className="hover:text-gold" href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="hover:text-gold" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="md:text-right">
            <button
              type="button"
              onClick={() => scrollToTarget("#")}
              className="link-line text-white/70 hover:text-white"
            >
              Volver arriba
            </button>
            <p className="mt-4 text-white/40">© {new Date().getFullYear()} Josue Sajche</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------------ */

export function HomeExperience() {
  const [started, setStarted] = useState(false);
  const handleComplete = useCallback(() => setStarted(true), []);

  return (
    <MotionShell>
      <Preloader onComplete={handleComplete} />
      <div className="noise" />
      <NavOverlay />
      <main>
        <Hero started={started} />
        <About />
        <Services />
        <Approach />
        <FeaturedProjects />
        <Builds />
        <Trajectory />
      </main>
      <Closing />
    </MotionShell>
  );
}
