"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CanvasTexture, DoubleSide, Group, SRGBColorSpace } from "three";

// Paleta inspirada en los textiles y barriletes de Sumpango.
const palette = ["#E63946", "#F4A261", "#FFD166", "#06D6A0", "#118AB2", "#9B5DE5", "#F15BB5", "#F3F0EA"];

/** Dibuja el diseño circular del barrilete en un canvas 2D. */
function drawKite(seed: number): HTMLCanvasElement {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return canvas;

  const center = size / 2;
  const rings = 7;
  for (let ring = 0; ring < rings; ring += 1) {
    const radius = center * (1 - ring / rings);
    const sectors = 12 + ((ring + seed) % 3) * 6;
    for (let sector = 0; sector < sectors; sector += 1) {
      const start = (sector / sectors) * Math.PI * 2;
      const end = ((sector + 1) / sectors) * Math.PI * 2;
      context.beginPath();
      context.moveTo(center, center);
      context.arc(center, center, radius, start, end);
      context.closePath();
      context.fillStyle = palette[(sector + ring * 2 + seed) % palette.length];
      context.fill();
    }
    // Contorno negro entre anillos, como el papel de china recortado.
    context.beginPath();
    context.arc(center, center, radius, 0, Math.PI * 2);
    context.lineWidth = 6;
    context.strokeStyle = "#0b0b0b";
    context.stroke();
  }

  // Líneas radiales (las varas de bambú vistas desde el frente).
  context.strokeStyle = "rgba(11,11,11,0.75)";
  context.lineWidth = 4;
  for (let i = 0; i < 16; i += 1) {
    const angle = (i / 16) * Math.PI * 2;
    context.beginPath();
    context.moveTo(center, center);
    context.lineTo(center + Math.cos(angle) * center, center + Math.sin(angle) * center);
    context.stroke();
  }

  // Estrella central.
  context.beginPath();
  for (let i = 0; i < 16; i += 1) {
    const r = i % 2 === 0 ? center * 0.14 : center * 0.06;
    const angle = (i / 16) * Math.PI * 2;
    context.lineTo(center + Math.cos(angle) * r, center + Math.sin(angle) * r);
  }
  context.closePath();
  context.fillStyle = "#F3F0EA";
  context.fill();

  return canvas;
}

interface KiteProps {
  radius?: number;
  seed?: number;
  /** Cola con banderines. */
  tail?: boolean;
}

/** Barrilete gigante de Sumpango: disco decorado, varas y cola de banderines. */
export function Kite({ radius = 1.5, seed = 0, tail = true }: KiteProps) {
  const ref = useRef<Group>(null);
  const texture = useMemo(() => {
    const canvasTexture = new CanvasTexture(drawKite(seed));
    canvasTexture.colorSpace = SRGBColorSpace;
    canvasTexture.anisotropy = 4;
    return canvasTexture;
  }, [seed]);

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame(({ clock }) => {
    const group = ref.current;
    if (!group) return;
    // Balanceo suave, como si lo sostuviera el viento.
    const time = clock.elapsedTime + seed * 3;
    group.rotation.z = Math.sin(time * 0.6) * 0.08;
    group.rotation.x = Math.sin(time * 0.4) * 0.06;
  });

  const tailSegments = 9;

  return (
    <group ref={ref}>
      <mesh castShadow>
        <circleGeometry args={[radius, 96]} />
        <meshStandardMaterial map={texture} roughness={0.75} metalness={0} side={DoubleSide} />
      </mesh>
      {/* Varas de bambú detrás del disco */}
      {Array.from({ length: 8 }, (_, index) => (
        <mesh key={index} rotation={[0, 0, (index / 8) * Math.PI]} position={[0, 0, -0.02]}>
          <cylinderGeometry args={[0.012, 0.012, radius * 2.06, 6]} />
          <meshStandardMaterial color="#c9a46c" roughness={0.9} />
        </mesh>
      ))}
      {tail
        ? Array.from({ length: tailSegments }, (_, index) => {
            const t = (index + 1) / tailSegments;
            return (
              <mesh
                key={`tail-${index}`}
                position={[Math.sin(t * 6 + seed) * 0.25, -radius - t * radius * 1.6, Math.cos(t * 5) * 0.1]}
                rotation={[0, 0, Math.sin(t * 6) * 0.5]}
              >
                <planeGeometry args={[0.28, 0.16]} />
                <meshStandardMaterial color={palette[(index + seed) % palette.length]} side={DoubleSide} roughness={0.8} />
              </mesh>
            );
          })
        : null}
    </group>
  );
}
