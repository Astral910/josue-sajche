"use client";

import dynamic from "next/dynamic";

import { landmarks } from "@/data/site";

const SpotlightLandmark = dynamic(
  () => import("@/components/three/spotlight-landmark").then((module) => module.SpotlightLandmark),
  { ssr: false },
);

interface ProjectStageProps {
  /** Índice del proyecto ("01"…"05"); define qué símbolo se muestra. */
  index: string;
  label: string;
}

/** Plataforma 3D del caso de estudio: cada build tiene su propio símbolo guatemalteco. */
export function ProjectStage({ index, label }: ProjectStageProps) {
  const position = Math.max(0, Math.min(landmarks.length - 1, Number(index) - 1));
  const landmark = landmarks[position] ?? landmarks[0];

  return (
    <div className="relative h-[55svh] w-full overflow-hidden border-y border-white/10 bg-[#070707] md:h-[80svh]">
      <SpotlightLandmark kind={landmark.kind} zoom={0.8} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-5 md:px-10">
        <span className="section-label">
          Proyecto {index} · {landmark.name}
        </span>
        <span className="section-label">{label}</span>
      </div>
    </div>
  );
}
