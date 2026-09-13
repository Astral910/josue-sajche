"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import {
  CatmullRomCurve3,
  LatheGeometry,
  Mesh,
  MeshStandardMaterial,
  PointLight,
  TubeGeometry,
  Vector2,
  Vector3,
} from "three";

import { Embers } from "@/components/three/objects/embers";

interface VolcanoProps {
  radius?: number;
  height?: number;
  /** Semilla para variar el relieve entre volcanes. */
  seed?: number;
  /** Si está activo muestra lava y brasas (como el Pacaya o el de Fuego). */
  active?: boolean;
  /** Intensidad de erupción 0→1 (scroll). Sin ref, la actividad es constante. */
  eruptionRef?: MutableRefObject<number>;
  color?: string;
  position?: [number, number, number];
}

// Relieve pseudoaleatorio a partir de sumas de senos: barato y determinista.
function ridge(angle: number, t: number, seed: number): number {
  return (
    Math.sin(angle * 3 + seed) * 0.5 +
    Math.sin(angle * 7 + seed * 2.3 + t * 4) * 0.3 +
    Math.sin(angle * 13 + seed * 4.1 + t * 9) * 0.2
  );
}

/** Radio del cono a una altura relativa t (perfil cóncavo de estratovolcán). */
function profileRadius(radius: number, t: number): number {
  const craterRadius = radius * 0.16;
  return craterRadius + (radius - craterRadius) * Math.pow(1 - t, 1.55);
}

function createVolcanoGeometry(radius: number, height: number, seed: number): LatheGeometry {
  const craterRadius = radius * 0.16;
  const profile: Vector2[] = [];
  const steps = 26;

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    profile.push(new Vector2(profileRadius(radius, t), t * height));
  }
  // Cráter: el perfil baja hacia el centro.
  profile.push(new Vector2(craterRadius * 0.55, height * 0.94));
  profile.push(new Vector2(0, height * 0.9));

  const geometry = new LatheGeometry(profile, 72);
  const position = geometry.getAttribute("position");

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    const t = y / height;
    const r = Math.hypot(x, z);
    if (r < craterRadius * 0.7) continue; // el cráter se mantiene limpio
    const angle = Math.atan2(z, x);
    const amount = 1 + ridge(angle, t, seed) * 0.09 * (1 - t * 0.6);
    position.setX(i, x * amount);
    position.setZ(i, z * amount);
    position.setY(i, y + ridge(angle * 2, t, seed + 1) * 0.02 * height);
  }
  position.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

/** Colada de lava: tubo que sigue el perfil del cono desde el cráter a la base. */
function createFlowGeometry(radius: number, height: number, angle: number, seed: number): TubeGeometry {
  const points: Vector3[] = [];
  const steps = 18;
  for (let i = 0; i <= steps; i += 1) {
    const t = 1 - i / steps; // del cráter (t=1) hacia la base (t=0)
    const wobble = Math.sin(t * 9 + seed) * 0.12;
    const r = profileRadius(radius, t) * 1.02;
    const a = angle + wobble;
    points.push(new Vector3(Math.cos(a) * r, t * height * 0.93 + 0.02, Math.sin(a) * r));
  }
  return new TubeGeometry(new CatmullRomCurve3(points), 48, radius * 0.022, 6, false);
}

function LavaFlows({
  radius,
  height,
  seed,
  eruptionRef,
}: {
  radius: number;
  height: number;
  seed: number;
  eruptionRef?: MutableRefObject<number>;
}) {
  const geometries = useMemo(
    () => [0.4, 2.1, 3.9].map((angle, index) => createFlowGeometry(radius, height, angle + seed, seed + index)),
    [radius, height, seed],
  );
  const meshes = useRef<(Mesh | null)[]>([]);

  useFrame(() => {
    const intensity = eruptionRef ? eruptionRef.current : 1;
    geometries.forEach((geometry, index) => {
      const mesh = meshes.current[index];
      if (!mesh || !geometry.index) return;
      // Cada colada avanza con un pequeño retraso respecto a la anterior.
      const local = Math.max(0, Math.min(1, (intensity - index * 0.12) / 0.7));
      geometry.setDrawRange(0, Math.floor(geometry.index.count * local));
      mesh.visible = local > 0.001;
    });
  });

  return (
    <>
      {geometries.map((geometry, index) => (
        <mesh
          key={index}
          geometry={geometry}
          ref={(mesh) => {
            meshes.current[index] = mesh;
          }}
        >
          <meshStandardMaterial color="#ff3d00" emissive="#ff5a1f" emissiveIntensity={2.4} toneMapped={false} />
        </mesh>
      ))}
    </>
  );
}

/** Volcán estilizado (low-poly con sombreado plano), con erupción opcional. */
export function Volcano({
  radius = 4,
  height = 3.2,
  seed = 1,
  active = false,
  eruptionRef,
  color = "#1b1917",
  position = [0, 0, 0],
}: VolcanoProps) {
  const geometry = useMemo(() => createVolcanoGeometry(radius, height, seed), [radius, height, seed]);
  const craterY = height * 0.92;
  const craterOrigin = useMemo<[number, number, number]>(() => [0, craterY, 0], [craterY]);
  const lavaRef = useRef<MeshStandardMaterial>(null);
  const lightRef = useRef<PointLight>(null);

  useFrame(({ clock }) => {
    if (!active) return;
    const intensity = eruptionRef ? eruptionRef.current : 1;
    const pulse = 0.85 + Math.sin(clock.elapsedTime * 6) * 0.15;
    if (lavaRef.current) lavaRef.current.emissiveIntensity = (0.6 + intensity * 3.4) * pulse;
    if (lightRef.current) lightRef.current.intensity = (6 + intensity * 90) * pulse;
  });

  return (
    <group position={position}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.95} metalness={0.05} flatShading />
      </mesh>
      {active ? (
        <>
          {/* Lava en el cráter */}
          <mesh position={[0, craterY, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[radius * 0.11, 32]} />
            <meshStandardMaterial
              ref={lavaRef}
              color="#ff4d00"
              emissive="#ff5a1f"
              emissiveIntensity={1}
              toneMapped={false}
            />
          </mesh>
          <pointLight
            ref={lightRef}
            position={[0, craterY + 0.5, 0]}
            color="#ff6a1f"
            intensity={10}
            distance={radius * 4}
            decay={2}
          />
          <LavaFlows radius={radius} height={height} seed={seed} eruptionRef={eruptionRef} />
          {/* Brasas */}
          <Embers
            origin={craterOrigin}
            radius={radius * 0.1}
            height={height * 1.3}
            count={140}
            speed={0.9}
            spread={0.12}
            intensityRef={eruptionRef}
          />
          {/* Columna de ceniza */}
          <Embers
            origin={craterOrigin}
            radius={radius * 0.12}
            height={height * 2.4}
            count={360}
            speed={1.1}
            spread={0.35}
            size={radius * 0.075}
            color="#6b625b"
            ash
            intensityRef={eruptionRef}
          />
        </>
      ) : null}
    </group>
  );
}
