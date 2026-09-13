"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferAttribute,
  CanvasTexture,
  NormalBlending,
  Points,
  PointsMaterial,
} from "three";

let spriteTexture: CanvasTexture | null = null;

/** Sprite circular con degradado suave, compartido por todas las partículas. */
function getSpriteTexture(): CanvasTexture {
  if (spriteTexture) return spriteTexture;
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (context) {
    const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.45, "rgba(255,255,255,0.6)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
  }
  spriteTexture = new CanvasTexture(canvas);
  return spriteTexture;
}

interface EmbersProps {
  count?: number;
  /** Punto de origen (cráter). */
  origin?: [number, number, number];
  /** Radio horizontal de dispersión y altura máxima del ascenso. */
  radius?: number;
  height?: number;
  color?: string;
  size?: number;
  speed?: number;
  /** Cuánto se abre la columna al subir (0 = recta). */
  spread?: number;
  /** Intensidad 0→1 controlada desde fuera (scroll). Si falta, es 1. */
  intensityRef?: MutableRefObject<number>;
  /** Ceniza (mezcla normal, opaca) en lugar de brasas (aditiva). */
  ash?: boolean;
}

/**
 * Partículas que ascienden desde un punto y se reinician al llegar arriba.
 * Sirven como brasas, ceniza (ash) o cielo estrellado (speed 0).
 */
export function Embers({
  count = 90,
  origin = [0, 0, 0],
  radius = 0.4,
  height = 3,
  color = "#ff7a2f",
  size = 0.07,
  speed = 0.6,
  spread = 0,
  intensityRef,
  ash = false,
}: EmbersProps) {
  const ref = useRef<Points>(null);
  const materialRef = useRef<PointsMaterial>(null);
  const sprite = useMemo(() => getSpriteTexture(), []);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * radius;
      const lift = Math.random() * height;
      positions[i * 3] = origin[0] + Math.cos(angle) * distance * (1 + spread * lift);
      positions[i * 3 + 1] = origin[1] + lift;
      positions[i * 3 + 2] = origin[2] + Math.sin(angle) * distance * (1 + spread * lift);
      seeds[i] = Math.random();
    }
    return { positions, seeds };
  }, [count, origin, radius, height, spread]);

  useFrame(({ clock }, delta) => {
    const points = ref.current;
    const material = materialRef.current;
    if (!points || !material) return;

    const intensity = intensityRef ? intensityRef.current : 1;
    material.opacity = (ash ? 0.55 : 0.95) * Math.min(1, intensity * 1.4);
    material.size = size * (0.6 + intensity * 0.6);
    if (speed === 0) return;

    const attribute = points.geometry.getAttribute("position") as BufferAttribute;
    const array = attribute.array as Float32Array;
    const time = clock.elapsedTime;
    const velocity = speed * (0.25 + intensity * 1.2);

    for (let i = 0; i < count; i += 1) {
      const index = i * 3;
      const seed = seeds[i];
      const lift = array[index + 1] - origin[1];
      array[index + 1] += delta * velocity * (0.5 + seed);
      // Deriva lateral: turbulencia + apertura de la columna.
      array[index] += (Math.sin(time * (0.8 + seed) + seed * 10) * 0.25 + (array[index] - origin[0]) * spread * 0.8) * delta;
      array[index + 2] += (Math.cos(time * (0.6 + seed) + seed * 7) * 0.25 + (array[index + 2] - origin[2]) * spread * 0.8) * delta;

      // Al superar la altura máxima (según intensidad) vuelve al cráter.
      if (lift > height * (0.15 + intensity * 0.85)) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius;
        array[index] = origin[0] + Math.cos(angle) * distance;
        array[index + 1] = origin[1];
        array[index + 2] = origin[2] + Math.sin(angle) * distance;
      }
    }
    attribute.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        map={sprite}
        size={size}
        color={color}
        transparent
        opacity={0.9}
        blending={ash ? NormalBlending : AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
