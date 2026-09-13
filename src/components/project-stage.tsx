"use client";

import dynamic from "next/dynamic";

import { fleet } from "@/data/site";

const SpotlightCar = dynamic(
  () => import("@/components/three/spotlight-car").then((module) => module.SpotlightCar),
  { ssr: false },
);

interface ProjectStageProps {
  /** Índice del proyecto ("01"…"05"); define qué auto de la flota se muestra. */
  index: string;
  label: string;
}

/** Plataforma 3D del caso de estudio: cada build tiene su propio auto y pintura. */
export function ProjectStage({ index, label }: ProjectStageProps) {
  const position = Math.max(0, Math.min(fleet.length - 1, Number(index) - 1));
  const car = fleet[position] ?? fleet[0];

  return (
    <div className="relative h-[55svh] w-full overflow-hidden border-y border-white/10 bg-[#070707] md:h-[80svh]">
      <SpotlightCar model={car.file} paint={car.paint} zoom={0.72} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-5 md:px-10">
        <span className="section-label">Build {index}</span>
        <span className="section-label">{label}</span>
      </div>
    </div>
  );
}
