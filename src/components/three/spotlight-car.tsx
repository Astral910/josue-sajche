"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { Group, MathUtils } from "three";

import { CarModel } from "@/components/three/car-model";

interface SpotlightCarProps {
  model: string;
  paint: string;
  /** Factor de distancia de la cámara (1 = por defecto, <1 acerca). */
  zoom?: number;
}

function Turntable({ model, paint }: SpotlightCarProps) {
  const ref = useRef<Group>(null);
  const pop = useRef(0);

  // Cada cambio de modelo reinicia una pequeña animación de "aparición".
  useEffect(() => {
    pop.current = 0;
  }, [model]);

  useFrame((_, delta) => {
    const group = ref.current;
    if (!group) return;
    pop.current = Math.min(1, pop.current + delta * 1.6);
    const eased = 1 - Math.pow(1 - pop.current, 3);
    group.scale.setScalar(MathUtils.lerp(0.7, 1, eased));
    group.position.y = MathUtils.lerp(-0.6, 0, eased);
    group.rotation.y += delta * 0.35;
  });

  return (
    <group ref={ref}>
      <CarModel key={model} file={model} paint={paint} length={3} />
    </group>
  );
}

function Rig({ zoom }: { zoom: number }) {
  const { camera, size } = useThree();

  useFrame(() => {
    // En pantallas estrechas la cámara se aleja para que el auto entre completo.
    const narrow = size.width < 640;
    const distance = (narrow ? 9.5 : 7.4) * zoom;
    camera.position.set(4.4 * zoom, 1.9, distance);
    camera.lookAt(0, 0.45, 0);
  });

  return null;
}

/**
 * Plataforma giratoria: un solo auto bajo un foco, que cambia de modelo y de
 * pintura según el paso activo de la sección "Enfoque".
 */
export function SpotlightCar({ model, paint, zoom = 1 }: SpotlightCarProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [4.6, 2.1, 7.6], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Rig zoom={zoom} />
      <ambientLight intensity={0.45} />
      <spotLight position={[2, 8, 4]} angle={0.5} penumbra={1} intensity={220} color="#fff4e0" />
      <spotLight position={[-6, 3, -2]} angle={0.6} penumbra={1} intensity={80} color="#e8b86d" />
      <spotLight position={[5, 2, -5]} angle={0.6} penumbra={1} intensity={60} color="#9fb2ff" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={3} position={[0, 5, -3]} scale={[10, 2, 1]} color="#fff6e6" />
        <Lightformer form="rect" intensity={2} position={[-6, 2, 2]} rotation={[0, Math.PI / 2, 0]} scale={[6, 1.5, 1]} color="#e8b86d" />
        <Lightformer form="rect" intensity={1.5} position={[6, 2, 2]} rotation={[0, -Math.PI / 2, 0]} scale={[6, 1.5, 1]} color="#9fb2ff" />
      </Environment>
      <Suspense fallback={null}>
        <Turntable model={model} paint={paint} />
      </Suspense>
      <ContactShadows position={[0, 0, 0]} opacity={0.7} scale={12} blur={2.2} far={3} />
    </Canvas>
  );
}
