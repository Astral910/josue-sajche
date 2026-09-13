"use client";

import { Color } from "three";

interface MarimbaProps {
  keys?: number;
}

/** Marimba de teclas de hormigo con resonadores, patas y baquetas. */
export function Marimba({ keys = 22 }: MarimbaProps) {
  const width = 2.8;
  const keyWidth = 0.09;
  const gap = 0.03;
  const totalKeys = keys * (keyWidth + gap) - gap;
  const scaleFactor = width / totalKeys;
  const deckY = 1.05;
  const dark = new Color("#8a5228");
  const light = new Color("#e2b072");

  return (
    <group>
      {/* Rieles laterales */}
      {[0.55, -0.35].map((z, index) => (
        <mesh key={index} position={[0, deckY - 0.04, z]} castShadow>
          <boxGeometry args={[width + 0.25, 0.08, 0.1]} />
          <meshStandardMaterial color="#4a2b14" roughness={0.85} />
        </mesh>
      ))}

      {Array.from({ length: keys }, (_, index) => {
        const t = index / (keys - 1);
        const x = (-totalKeys / 2 + index * (keyWidth + gap) + keyWidth / 2) * scaleFactor;
        const length = 0.95 - t * 0.5;
        const color = dark.clone().lerp(light, t);
        const resonatorHeight = 0.9 - t * 0.6;
        return (
          <group key={index} position={[x, 0, 0]}>
            {/* Tecla */}
            <mesh position={[0, deckY, 0.1 - (0.95 - length) / 2]} castShadow>
              <boxGeometry args={[keyWidth * scaleFactor * 0.9, 0.05, length]} />
              <meshStandardMaterial color={color} roughness={0.55} />
            </mesh>
            {/* Resonador (cajón) */}
            <mesh position={[0, deckY - 0.1 - resonatorHeight / 2, 0.1]} castShadow>
              <boxGeometry args={[keyWidth * scaleFactor * 0.85, resonatorHeight, 0.2]} />
              <meshStandardMaterial color="#3d2412" roughness={0.9} />
            </mesh>
          </group>
        );
      })}

      {/* Patas */}
      {[
        [-width / 2 - 0.05, 0.5],
        [width / 2 + 0.05, 0.5],
        [-width / 2 - 0.05, -0.3],
        [width / 2 + 0.05, -0.3],
      ].map(([x, z], index) => (
        <mesh key={index} position={[x, deckY / 2 - 0.05, z]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, deckY - 0.1, 8]} />
          <meshStandardMaterial color="#4a2b14" roughness={0.85} />
        </mesh>
      ))}

      {/* Baquetas apoyadas sobre las teclas */}
      {[-0.3, 0.25].map((x, index) => (
        <group key={index} position={[x, deckY + 0.08, 0.15]} rotation={[0.2, index ? -0.5 : 0.4, 0]}>
          <mesh>
            <cylinderGeometry args={[0.012, 0.012, 0.6, 6]} />
            <meshStandardMaterial color="#e8d9c4" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color="#111111" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
