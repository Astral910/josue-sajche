"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { lockScroll } from "@/components/motion/motion-shell";

interface PreloaderProps {
  onComplete: () => void;
}

/**
 * Cortina de entrada: contador, marca y una barra que se llena mientras los
 * modelos 3D terminan de cargar. Al finalizar, la cortina sube y libera el hero.
 */
export function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const counter = counterRef.current;
    const bar = barRef.current;
    if (!root || !counter || !bar) return;

    lockScroll(true);
    const state = { value: 0 };

    const timeline = gsap.timeline({
      onComplete: () => {
        lockScroll(false);
        setDone(true);
        onComplete();
      },
    });

    timeline
      .to(state, {
        value: 100,
        duration: 1.9,
        ease: "power2.inOut",
        onUpdate: () => {
          counter.textContent = String(Math.round(state.value)).padStart(3, "0");
          bar.style.transform = `scaleX(${state.value / 100})`;
        },
      })
      .to(".preloader-word", { yPercent: -110, duration: 0.6, ease: "power3.in", stagger: 0.05 }, "-=0.1")
      .to(root, { yPercent: -100, duration: 1, ease: "power4.inOut" }, "-=0.2");

    return () => {
      timeline.kill();
      lockScroll(false);
    };
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-[#050505] px-5 py-6 text-[#f3f0ea] md:px-10 md:py-8"
      aria-live="polite"
      aria-label="Cargando portafolio"
    >
      <div className="flex items-start justify-between">
        <span className="section-label">Josue Sajche · Atelier digital</span>
        <span className="section-label">Guatemala</span>
      </div>

      <div className="overflow-hidden">
        <p className="display flex flex-wrap gap-x-[0.25em] text-[clamp(2.6rem,9vw,8rem)] font-bold uppercase leading-[0.85]">
          <span className="preloader-word inline-block">Rechaza</span>
          <span className="preloader-word inline-block text-white/30">lo</span>
          <span className="preloader-word inline-block">ordinario</span>
        </p>
      </div>

      <div>
        <div className="flex items-end justify-between">
          <span ref={counterRef} className="font-mono text-sm tabular-nums text-white/70">
            000
          </span>
          <span className="section-label">Cargando showroom</span>
        </div>
        <div className="mt-3 h-px w-full bg-white/15">
          <div ref={barRef} className="h-full origin-left scale-x-0 bg-gold" />
        </div>
      </div>
    </div>
  );
}
