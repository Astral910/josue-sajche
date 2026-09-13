"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Particle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  alpha: number;
}

export function HeroVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    const image = imageRef.current;
    if (!root || !image) return;

    const context = gsap.context(() => {
      gsap.to(image, {
        scale: 1.22,
        rotate: 2.5,
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
      gsap.to(root, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "65% top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let particles: Particle[] = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = (): void => {
      const ratio = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: window.innerWidth < 768 ? 28 : 54 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.4 + 0.25,
        speed: Math.random() * 0.14 + 0.03,
        alpha: Math.random() * 0.42 + 0.08,
      }));
    };

    const draw = (): void => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((particle) => {
        particle.y -= particle.speed;
        if (particle.y < -5) particle.y = window.innerHeight + 5;
        context.beginPath();
        context.fillStyle = `rgba(232, 184, 109, ${particle.alpha})`;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
      if (!reduced) frame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-0 h-screen overflow-hidden bg-ink"
      aria-hidden="true"
    >
      <div ref={imageRef} className="absolute inset-0 origin-center">
        <Image
          src="/josue-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />
    </div>
  );
}
