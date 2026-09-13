"use client";

import { Kite } from "@/components/three/objects/kite";
import { Lake } from "@/components/three/objects/lake";
import { Marimba } from "@/components/three/objects/marimba";
import { Pyramid } from "@/components/three/objects/pyramid";
import { Volcano } from "@/components/three/objects/volcano";
import type { LandmarkKind } from "@/data/site";

interface LandmarkProps {
  kind: LandmarkKind;
}

/** Encuadre de cámara por objeto: altura a la que mira, distancia y elevación. */
export const landmarkView: Record<LandmarkKind, { lookAtY: number; distance: number; elevation: number }> = {
  volcan: { lookAtY: 1.1, distance: 1, elevation: 1 },
  barrilete: { lookAtY: 1.5, distance: 1, elevation: 1 },
  piramide: { lookAtY: 1.3, distance: 1, elevation: 1 },
  lago: { lookAtY: 0.1, distance: 0.9, elevation: 2.4 },
  marimba: { lookAtY: 0.9, distance: 0.8, elevation: 1 },
};

/**
 * Objeto guatemalteco normalizado para la plataforma giratoria: todos ocupan
 * un volumen similar (~3 unidades) y se apoyan sobre y = 0.
 */
export function Landmark({ kind }: LandmarkProps) {
  switch (kind) {
    case "volcan":
      return <Volcano radius={2.4} height={2.3} seed={2} active color="#1f1c19" />;
    case "barrilete":
      return (
        <group position={[0, 2.1, 0]} rotation={[0, 0.2, 0]}>
          <Kite radius={1.1} seed={3} />
        </group>
      );
    case "piramide":
      return <Pyramid base={3} />;
    case "lago":
      return <Lake radius={2.2} />;
    case "marimba":
      return (
        <group scale={1.5}>
          <Marimba />
        </group>
      );
    default:
      return null;
  }
}
