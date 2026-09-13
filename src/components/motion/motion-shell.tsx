"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Instancia compartida para que los enlaces internos usen el scroll suave.
const lenisRef: { current: Lenis | null } = { current: null };

/** Desplaza la página hacia un selector (o al inicio) respetando Lenis. */
export function scrollToTarget(target: string): void {
  const element =
    target === "#" || target === "/" ? null : document.querySelector<HTMLElement>(target);
  if (lenisRef.current) {
    lenisRef.current.scrollTo(element ?? 0, { offset: 0, duration: 1.4 });
    return;
  }
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/** Bloquea o libera el scroll (preloader y menú). */
export function lockScroll(locked: boolean): void {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (locked) lenisRef.current?.stop();
  else lenisRef.current?.start();
}

export function MotionShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;

    const onScroll = (): void => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number): void => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(tick);
    };
  }, []);

  return children;
}
