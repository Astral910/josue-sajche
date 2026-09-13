"use client";

import { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  MeshReflectorMaterial,
  useGLTF,
} from "@react-three/drei";
import { Group, MathUtils } from "three";

import { CarModel } from "@/components/three/car-model";
import { fleet, type CarSpec } from "@/data/site";
import { asset } from "@/lib/asset";

// Precarga todos los modelos apenas se importa el módulo.
fleet.forEach((car) => useGLTF.preload(asset(`/models/${car.file}`)));

interface ShowroomProps {
  /** Cuando es true arranca la coreografía de entrada de los autos. */
  started: boolean;
  /** Progreso de scroll del hero (0 → 1) actualizado desde GSAP. */
  scrollRef: MutableRefObject<number>;
}

interface Slot {
  x: number;
  z: number;
  rotationY: number;
  delay: number;
}

// Formación en "V" abierta hacia la cámara: el auto protagonista al frente.
const desktopSlots: Slot[] = [
  { x: -4.6, z: -2.4, rotationY: 0.55, delay: 0.55 },
  { x: -2.4, z: -0.6, rotationY: 0.35, delay: 0.3 },
  { x: 0, z: 1.1, rotationY: -0.25, delay: 0 },
  { x: 2.4, z: -0.6, rotationY: -0.5, delay: 0.42 },
  { x: 4.6, z: -2.4, rotationY: -0.75, delay: 0.68 },
];

const mobileSlots: Slot[] = [
  { x: -1.6, z: -2.2, rotationY: 0.45, delay: 0.35 },
  { x: 0, z: 0.4, rotationY: -0.3, delay: 0 },
  { x: 1.6, z: -2.2, rotationY: -0.7, delay: 0.5 },
];

const easeOutExpo = (t: number): number =>
  t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);

function Car({
  spec,
  slot,
  started,
  scrollRef,
  compact,
}: {
  spec: CarSpec;
  slot: Slot;
  started: boolean;
  scrollRef: MutableRefObject<number>;
  compact: boolean;
}) {
  const ref = useRef<Group>(null);
  const startedAt = useRef<number | null>(null);

  useFrame(({ clock }) => {
    const group = ref.current;
    if (!group) return;

    if (started && startedAt.current === null) {
      startedAt.current = clock.elapsedTime;
    }

    // Progreso de la entrada: cada auto arranca con su propio retraso.
    const elapsed =
      startedAt.current === null
        ? 0
        : Math.max(0, clock.elapsedTime - startedAt.current - slot.delay);
    const entry = easeOutExpo(Math.min(1, elapsed / 1.9));

    // Los autos llegan desde la derecha y desde el fondo, con un leve giro.
    const fromX = slot.x + 16;
    const fromZ = slot.z - 9;
    const scroll = scrollRef.current;
    const spread = 1 + scroll * 0.9;

    group.position.x = MathUtils.lerp(fromX, slot.x, entry) * spread;
    group.position.z = MathUtils.lerp(fromZ, slot.z, entry) - scroll * 4;
    group.position.y = -scroll * 1.6 + Math.sin(clock.elapsedTime * 0.7 + slot.x) * 0.015;
    group.rotation.y = MathUtils.lerp(slot.rotationY + 1.4, slot.rotationY, entry);
    group.visible = entry > 0.001;
  });

  return (
    <group ref={ref} visible={false}>
      <CarModel file={spec.file} paint={spec.paint} length={compact ? 2.2 : 3.2} />
    </group>
  );
}

function Rig({
  scrollRef,
  compact,
}: {
  scrollRef: MutableRefObject<number>;
  compact: boolean;
}) {
  const { camera, pointer } = useThree();

  useFrame(() => {
    // Paralaje sutil con el puntero + alejamiento conforme se hace scroll.
    const scroll = scrollRef.current;
    const baseZ = compact ? 17.5 : 15.5;
    const lookY = compact ? -1.5 : -0.35;
    camera.position.x = MathUtils.lerp(camera.position.x, pointer.x * 0.9, 0.04);
    camera.position.y = MathUtils.lerp(camera.position.y, 2.3 + pointer.y * 0.3 + scroll * 2.2, 0.05);
    camera.position.z = MathUtils.lerp(camera.position.z, baseZ + scroll * 5, 0.05);
    camera.lookAt(0, lookY, 0);
  });

  return null;
}

function Floor({ compact }: { compact: boolean }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[60, 60]} />
      <MeshReflectorMaterial
        blur={[400, 120]}
        resolution={compact ? 256 : 768}
        mixBlur={1}
        mixStrength={38}
        roughness={0.9}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.3}
        color="#050505"
        metalness={0.6}
        mirror={0.5}
      />
    </mesh>
  );
}

function Scene({ started, scrollRef, compact }: ShowroomProps & { compact: boolean }) {
  const slots = compact ? mobileSlots : desktopSlots;
  const cars = useMemo(
    () => (compact ? [fleet[0], fleet[1], fleet[3]] : fleet),
    [compact],
  );

  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 22, 46]} />
      <ambientLight intensity={0.4} />
      <spotLight
        position={[0, 10, 6]}
        angle={0.6}
        penumbra={0.9}
        intensity={260}
        color="#fff4e0"
        castShadow
      />
      <spotLight position={[-9, 5, -2]} angle={0.5} penumbra={1} intensity={120} color="#e8b86d" />
      <spotLight position={[10, 4, -6]} angle={0.6} penumbra={1} intensity={90} color="#8ea2ff" />
      {/* Entorno procedural (sin archivos externos) para reflejos de estudio. */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={4} position={[0, 6, -4]} scale={[14, 2, 1]} color="#fff6e6" />
        <Lightformer form="rect" intensity={2.5} position={[-8, 3, 2]} rotation={[0, Math.PI / 2, 0]} scale={[8, 1.5, 1]} color="#e8b86d" />
        <Lightformer form="rect" intensity={2} position={[8, 3, 2]} rotation={[0, -Math.PI / 2, 0]} scale={[8, 1.5, 1]} color="#9fb2ff" />
        <Lightformer form="ring" intensity={1.5} position={[0, 8, 4]} scale={4} color="#ffffff" />
      </Environment>
      <Rig scrollRef={scrollRef} compact={compact} />
      <Floor compact={compact} />
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.75}
        scale={30}
        blur={2.4}
        far={4}
        color="#000"
      />
      <Suspense fallback={null}>
        {cars.map((car, index) => (
          <Car
            key={car.file}
            spec={car}
            slot={slots[index] ?? slots[0]}
            started={started}
            scrollRef={scrollRef}
            compact={compact}
          />
        ))}
      </Suspense>
    </>
  );
}

/**
 * Escena 3D del hero: una flota de autos entra al showroom cuando termina el
 * preloader y se dispersa conforme la persona hace scroll.
 */
export function Showroom({ started, scrollRef }: ShowroomProps) {
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
      camera={{ position: [0, 2.3, 15.5], fov: compact ? 38 : 28, near: 0.1, far: 80 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <Scene started={started} scrollRef={scrollRef} compact={compact} />
    </Canvas>
  );
}
