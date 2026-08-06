import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useThemeStore } from "@/store/themeStore";

const PARTICLE_COUNT = 50;
const CONNECTION_DISTANCE = 3.5;

const ParticleSystem = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const explosionTimer = useRef(0);
  const explosionCooldown = useRef(0);
  const theme = useThemeStore((s) => s.theme);
  const colorStr = theme === "dark" ? "#22c55e" : "#065f46"; // Darker emerald in light mode

  // Track mouse globally without triggering re-renders
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
      vel.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        )
      );
    }
    return [pos, vel];
  }, []);

  const linePositions = useMemo(() => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 3), []);
  const lineColors = useMemo(() => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 3), []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    // Parallax effect on mouse move
    const targetX = (mousePos.current.x * 10) / 2;
    const targetY = (mousePos.current.y * 10) / 2;
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.05;
    linesRef.current.position.copy(pointsRef.current.position);

    const pointerX = mousePos.current.x * 15;
    const pointerY = mousePos.current.y * 10;

    const positionsAttr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const baseColor = new THREE.Color(colorStr);

    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positionsAttr[i * 3] += velocities[i].x;
      positionsAttr[i * 3 + 1] += velocities[i].y;
      positionsAttr[i * 3 + 2] += velocities[i].z;

      // Mouse interaction (gentle repulsion)
      const dxPointer = positionsAttr[i * 3] - pointerX;
      const dyPointer = positionsAttr[i * 3 + 1] - pointerY;
      const distToPointerSq = dxPointer * dxPointer + dyPointer * dyPointer;

      if (distToPointerSq < 15) {
        const dist = Math.sqrt(distToPointerSq);
        const force = (15 - dist) * 0.02;
        positionsAttr[i * 3] += (dxPointer / dist) * force;
        positionsAttr[i * 3 + 1] += (dyPointer / dist) * force;
      }

      if (Math.abs(positionsAttr[i * 3]) > 12) velocities[i].x *= -1;
      if (Math.abs(positionsAttr[i * 3 + 1]) > 12) velocities[i].y *= -1;
      if (Math.abs(positionsAttr[i * 3 + 2]) > 12) velocities[i].z *= -1;

      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = positionsAttr[i * 3] - positionsAttr[j * 3];
        const dy = positionsAttr[i * 3 + 1] - positionsAttr[j * 3 + 1];
        const dz = positionsAttr[i * 3 + 2] - positionsAttr[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
          linePositions[vertexpos++] = positionsAttr[i * 3];
          linePositions[vertexpos++] = positionsAttr[i * 3 + 1];
          linePositions[vertexpos++] = positionsAttr[i * 3 + 2];

          linePositions[vertexpos++] = positionsAttr[j * 3];
          linePositions[vertexpos++] = positionsAttr[j * 3 + 1];
          linePositions[vertexpos++] = positionsAttr[j * 3 + 2];

          // Fade line color based on distance
          const alpha = Math.max(0.05, 1.0 - Math.sqrt(distSq) / CONNECTION_DISTANCE);

          lineColors[colorpos++] = baseColor.r * alpha;
          lineColors[colorpos++] = baseColor.g * alpha;
          lineColors[colorpos++] = baseColor.b * alpha;

          lineColors[colorpos++] = baseColor.r * alpha;
          lineColors[colorpos++] = baseColor.g * alpha;
          lineColors[colorpos++] = baseColor.b * alpha;

          numConnected++;
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    linesRef.current.geometry.setDrawRange(0, numConnected * 2);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color={colorStr} size={0.15} transparent opacity={0.9} />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 3}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.6} depthWrite={false} />
      </lineSegments>
    </>
  );
};

export default function Hero3DCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ParticleSystem />
      </Canvas>
    </div>
  );
}
