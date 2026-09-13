"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  Box3,
  Color,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Vector3,
} from "three";

import { asset } from "@/lib/asset";

interface CarModelProps {
  /** Nombre del archivo dentro de public/models. */
  file: string;
  /** Color objetivo de la carrocería; se interpola suavemente al cambiar. */
  paint: string;
  /** Longitud deseada del auto en unidades de la escena. */
  length?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

/**
 * Carga un modelo del Car Kit de Kenney (CC0) y le aplica un acabado de
 * showroom: pintura con clearcoat en la carrocería y caucho oscuro en las ruedas.
 */
export function CarModel({
  file,
  paint,
  length = 3.4,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: CarModelProps) {
  const { scene } = useGLTF(asset(`/models/${file}`));
  const groupRef = useRef<Group>(null);
  const targetColor = useMemo(() => new Color(paint), [paint]);

  // Cada instancia necesita su propia copia: el mismo modelo puede vivir en
  // varios canvas a la vez.
  const instance = useMemo(() => scene.clone(true), [scene]);

  const materials = useMemo(
    () => ({
      paint: new MeshPhysicalMaterial({
        color: new Color(paint),
        metalness: 0.35,
        roughness: 0.28,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
      }),
      wheel: new MeshStandardMaterial({
        color: "#0a0a0a",
        metalness: 0.25,
        roughness: 0.8,
      }),
    }),
    // Solo se crean una vez por instancia; el color cambia por interpolación.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [instance],
  );

  useLayoutEffect(() => {
    instance.traverse((child) => {
      if (!(child as Mesh).isMesh) return;
      const mesh = child as Mesh;
      const parentName = mesh.parent?.name ?? "";
      const isWheel = /wheel/i.test(mesh.name) || /wheel/i.test(parentName);
      mesh.material = isWheel ? materials.wheel : materials.paint;
      mesh.castShadow = true;
    });

    // Normaliza tamaño y apoya el auto sobre el suelo (y = 0).
    const box = new Box3().setFromObject(instance);
    const size = box.getSize(new Vector3());
    const scale = length / Math.max(size.x, size.z, 0.001);
    instance.scale.setScalar(scale);
    const scaledBox = new Box3().setFromObject(instance);
    const center = scaledBox.getCenter(new Vector3());
    instance.position.set(-center.x, -scaledBox.min.y, -center.z);
  }, [instance, materials, length]);

  useEffect(() => {
    return () => {
      materials.paint.dispose();
      materials.wheel.dispose();
    };
  }, [materials]);

  // Interpola el color de la pintura hacia el objetivo en cada frame.
  useFrame((_, delta) => {
    materials.paint.color.lerp(targetColor, Math.min(1, delta * 4));
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <primitive object={instance} />
    </group>
  );
}
