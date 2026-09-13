"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, MeshReflectorMaterial } from "@react-three/drei";
import { Group, MathUtils } from "three";

import { Embers } from "@/components/three/objects/embers";
import { Kite } from "@/components/three/objects/kite";
import { Volcano } from "@/components/three/objects/volcano";

interface CordilleraProps {
  /** Cuando es true arranca la coreografía de entrada. */
  started: boolean;
  /** Progreso de scroll del hero (0 → 1) actualizado desde GSAP. */
  scrollRef: MutableRefObject<number>;
}

const easeOutExpo = (t: number): number => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

interface Peak {
  position: [number, number, number];
  radius: number;
  height: number;
  seed: number;
  delay: number;
  active?: boolean;
  color?: string;
}

// Vista clásica desde Antigua: Agua a la izquierda, Fuego y Acatenango a la derecha.
// El activo hace el papel del Pacaya en erupción.
const desktopPeaks: Peak[] = [
  { position: [-7.5, 0, -3.5], radius: 6, height: 4.4, seed: 1, delay: 0.25, color: "#2b2620" },
  { position: [1.6, 0, -0.5], radius: 4.4, height: 3.9, seed: 2, delay: 0, active: true, color: "#332c25" },
  { position: [7.8, 0, -5], radius: 5.4, height: 4.7, seed: 3, delay: 0.45, color: "#27221d" },
];

const mobilePeaks: Peak[] = [
  { position: [-3.2, 0, -3], radius: 4.2, height: 3.6, seed: 1, delay: 0.25, color: "#2b2620" },
  { position: [1.2, 0, -0.5], radius: 3.4, height: 3.4, seed: 2, delay: 0, active: true, color: "#332c25" },
];

interface FloatingKite {
  position: [number, number, number];
  radius: number;
  seed: number;
  delay: number;
}

// Barriletes lejanos, como los de Todos los Santos vistos desde el valle.
const desktopKites: FloatingKite[] = [
  { position: [-11.5, 7.2, -14], radius: 1.1, seed: 1, delay: 1.1 },
  { position: [10.5, 8.4, -17], radius: 0.95, seed: 2, delay: 1.6 },
];

const mobileKites: FloatingKite[] = [{ position: [-3.6, 7.6, -13], radius: 0.85, seed: 1, delay: 1.1 }];

function RisingPeak({
  peak,
  started,
  scrollRef,
  eruptionRef,
}: {
  peak: Peak;
  started: boolean;
  scrollRef: MutableRefObject<number>;
  eruptionRef: MutableRefObject<number>;
}) {
  const ref = useRef<Group>(null);
  const startedAt = useRef<number | null>(null);

  useFrame(({ clock }) => {
    const group = ref.current;
    if (!group) return;
    if (started && startedAt.current === null) startedAt.current = clock.elapsedTime;

    const elapsed =
      startedAt.current === null ? 0 : Math.max(0, clock.elapsedTime - startedAt.current - peak.delay);
    const entry = easeOutExpo(Math.min(1, elapsed / 2.2));

    // Los volcanes emergen del lago y se hunden ligeramente al hacer scroll.
    const scroll = scrollRef.current;
    const shake = peak.active ? Math.sin(clock.elapsedTime * 38) * 0.015 * eruptionRef.current : 0;
    group.scale.set(1, MathUtils.lerp(0.02, 1, entry), 1);
    group.position.set(peak.position[0] + shake, peak.position[1] - scroll * 1.2, peak.position[2]);
    group.visible = entry > 0.001;
  });

  return (
    <group ref={ref} visible={false}>
      <Volcano
        radius={peak.radius}
        height={peak.height}
        seed={peak.seed}
        active={peak.active}
        eruptionRef={peak.active ? eruptionRef : undefined}
        color={peak.color}
      />
    </group>
  );
}

function DriftingKite({
  kite,
  started,
  scrollRef,
}: {
  kite: FloatingKite;
  started: boolean;
  scrollRef: MutableRefObject<number>;
}) {
  const ref = useRef<Group>(null);
  const startedAt = useRef<number | null>(null);

  useFrame(({ clock }) => {
    const group = ref.current;
    if (!group) return;
    if (started && startedAt.current === null) startedAt.current = clock.elapsedTime;
    const elapsed =
      startedAt.current === null ? 0 : Math.max(0, clock.elapsedTime - startedAt.current - kite.delay);
    const entry = easeOutExpo(Math.min(1, elapsed / 2.6));
    const time = clock.elapsedTime + kite.seed * 4;
    const scroll = scrollRef.current;

    group.position.set(
      MathUtils.lerp(kite.position[0] + 18, kite.position[0], entry) + Math.sin(time * 0.3) * 0.4,
      kite.position[1] + Math.sin(time * 0.5) * 0.3 + scroll * 3,
      kite.position[2],
    );
    group.rotation.y = MathUtils.lerp(0.8, -0.15, entry);
    group.visible = entry > 0.001;
  });

  return (
    <group ref={ref} visible={false}>
      <Kite radius={kite.radius} seed={kite.seed} />
    </group>
  );
}

function Rig({
  scrollRef,
  eruptionRef,
  compact,
}: {
  scrollRef: MutableRefObject<number>;
  eruptionRef: MutableRefObject<number>;
  compact: boolean;
}) {
  const { camera, pointer } = useThree();

  useFrame(({ clock }) => {
    const scroll = scrollRef.current;
    // La erupción se dispara a medida que la persona baja por el hero.
    eruptionRef.current = smoothstep(0.08, 0.6, scroll);

    const shake = eruptionRef.current * 0.06;
    const baseZ = compact ? 26 : 20;
    camera.position.x = MathUtils.lerp(camera.position.x, pointer.x * 0.8, 0.04) + Math.sin(clock.elapsedTime * 31) * shake;
    camera.position.y =
      MathUtils.lerp(camera.position.y, 3.2 + pointer.y * 0.3 + scroll * 3.5, 0.05) + Math.cos(clock.elapsedTime * 27) * shake;
    camera.position.z = MathUtils.lerp(camera.position.z, baseZ + scroll * 4, 0.05);
    camera.lookAt(0, compact ? 1 : 1.7 + scroll * 1.5, 0);
  });

  return null;
}

function Floor({ compact }: { compact: boolean }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[90, 90]} />
      <MeshReflectorMaterial
        blur={[420, 140]}
        resolution={compact ? 256 : 768}
        mixBlur={1}
        mixStrength={30}
        roughness={0.85}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.3}
        color="#04070a"
        metalness={0.7}
        mirror={0.55}
      />
    </mesh>
  );
}

function Scene({ started, scrollRef, compact }: CordilleraProps & { compact: boolean }) {
  const eruptionRef = useRef(0);
  const peaks = compact ? mobilePeaks : desktopPeaks;
  const kites = compact ? mobileKites : desktopKites;

  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 28, 60]} />
      <ambientLight intensity={0.4} />
      {/* Luna fría desde la izquierda y calidez desde la derecha */}
      <directionalLight position={[-12, 14, 8]} intensity={3.6} color="#dfe6ff" castShadow />
      <directionalLight position={[14, 6, -4]} intensity={1.2} color="#e8b86d" />
      <spotLight position={[0, 16, 14]} angle={0.8} penumbra={1} intensity={420} color="#fff1dc" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2.5} position={[0, 8, -10]} scale={[30, 3, 1]} color="#8fa3d6" />
        <Lightformer form="rect" intensity={1.5} position={[-14, 4, 0]} rotation={[0, Math.PI / 2, 0]} scale={[10, 2, 1]} color="#e8b86d" />
      </Environment>

      <Rig scrollRef={scrollRef} eruptionRef={eruptionRef} compact={compact} />
      <Floor compact={compact} />

      {/* Cielo estrellado */}
      <Embers
        count={compact ? 120 : 260}
        origin={[0, 5, -22]}
        radius={34}
        height={16}
        speed={0}
        size={0.06}
        color="#ffffff"
      />

      {peaks.map((peak) => (
        <RisingPeak key={peak.seed} peak={peak} started={started} scrollRef={scrollRef} eruptionRef={eruptionRef} />
      ))}
      {kites.map((kite) => (
        <DriftingKite key={kite.seed} kite={kite} started={started} scrollRef={scrollRef} />
      ))}
    </>
  );
}

/**
 * Escena 3D del hero: la cordillera emerge del lago al terminar el preloader y,
 * conforme la persona hace scroll, el volcán activo entra en erupción.
 */
export function Cordillera({ started, scrollRef }: CordilleraProps) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = (): void => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      dpr={[1, compact ? 1.5 : 2]}
      shadows
      camera={{ position: [0, 3.2, 20], fov: compact ? 42 : 30, near: 0.1, far: 90 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <Scene started={started} scrollRef={scrollRef} compact={compact} />
    </Canvas>
  );
}
