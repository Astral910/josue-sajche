"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { Group, MathUtils } from "three";

import { Landmark, landmarkView } from "@/components/three/landmark";
import type { LandmarkKind } from "@/data/site";

interface SpotlightLandmarkProps {
  kind: LandmarkKind;
  /** Factor de distancia de la cámara (1 = por defecto, <1 acerca). */
  zoom?: number;
}

function Turntable({ kind }: { kind: LandmarkKind }) {
  const ref = useRef<Group>(null);
  const pop = useRef(0);

  // Cada cambio de objeto reinicia una pequeña animación de "aparición".
  useEffect(() => {
    pop.current = 0;
  }, [kind]);

  useFrame((_, delta) => {
    const group = ref.current;
    if (!group) return;
    pop.current = Math.min(1, pop.current + delta * 1.6);
    const eased = 1 - Math.pow(1 - pop.current, 3);
    group.scale.setScalar(MathUtils.lerp(0.7, 1, eased));
    group.position.y = MathUtils.lerp(-0.6, 0, eased);
    group.rotation.y += delta * 0.3;
  });

  return (
    <group ref={ref}>
      <Landmark key={kind} kind={kind} />
    </group>
  );
}

function Rig({ zoom, kind }: { zoom: number; kind: LandmarkKind }) {
  const { camera, size } = useThree();
  const target = useRef({ ...landmarkView[kind] });

  useFrame(() => {
    // Cada objeto tiene su encuadre; la cámara transiciona suavemente entre ellos.
    const view = landmarkView[kind];
    const current = target.current;
    current.lookAtY = MathUtils.lerp(current.lookAtY, view.lookAtY, 0.05);
    current.distance = MathUtils.lerp(current.distance, view.distance, 0.05);
    current.elevation = MathUtils.lerp(current.elevation, view.elevation, 0.05);

    // En pantallas estrechas la cámara se aleja para que el objeto entre completo.
    const narrow = size.width < 640;
    const factor = zoom * current.distance;
    camera.position.set(4.8 * factor, 3.1 * factor * current.elevation, (narrow ? 11.5 : 8.8) * factor);
    camera.lookAt(0, current.lookAtY, 0);
  });

  return null;
}

/**
 * Plataforma giratoria: un objeto guatemalteco bajo un foco, que cambia según
 * el paso activo de la sección "Enfoque" o el build del caso de estudio.
 */
export function SpotlightLandmark({ kind, zoom = 1 }: SpotlightLandmarkProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [4.8, 3.1, 8.8], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Rig zoom={zoom} kind={kind} />
      <ambientLight intensity={0.5} />
      <spotLight position={[3, 9, 5]} angle={0.5} penumbra={1} intensity={260} color="#fff4e0" />
      <spotLight position={[-7, 4, -2]} angle={0.6} penumbra={1} intensity={90} color="#e8b86d" />
      <spotLight position={[6, 3, -6]} angle={0.6} penumbra={1} intensity={70} color="#9fb2ff" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={3} position={[0, 6, -4]} scale={[12, 2, 1]} color="#fff6e6" />
        <Lightformer form="rect" intensity={2} position={[-7, 2, 2]} rotation={[0, Math.PI / 2, 0]} scale={[6, 1.5, 1]} color="#e8b86d" />
        <Lightformer form="rect" intensity={1.5} position={[7, 2, 2]} rotation={[0, -Math.PI / 2, 0]} scale={[6, 1.5, 1]} color="#9fb2ff" />
      </Environment>
      <Turntable kind={kind} />
      <ContactShadows position={[0, 0, 0]} opacity={0.7} scale={14} blur={2.2} far={3} />
    </Canvas>
  );
}
