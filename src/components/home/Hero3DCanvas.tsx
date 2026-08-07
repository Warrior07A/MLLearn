import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useThemeStore } from "@/store/themeStore";

const BG_PARTICLE_COUNT = 75;
const PATH_NODE_COUNT = 12;
const CONNECTION_DISTANCE = 4.2;

const NetworkVisualization = () => {
  const bgPointsRef = useRef<THREE.Points>(null);
  const pathPointsRef = useRef<THREE.Points>(null);
  const bgLinesRef = useRef<THREE.LineSegments>(null);
  const pathLinesRef = useRef<THREE.LineSegments>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  const theme = useThemeStore((s) => s.theme);
  
  // Colors - Match the app's palette (Green accent) while using the image's structure
  // #a1a1aa (zinc-400) is brighter for dark mode, #d4d4d8 (zinc-300) is subtler for light mode
  const bgColorStr = theme === "dark" ? "#a1a1aa" : "#d4d4d8"; 
  const pathColorStr = theme === "dark" ? "#22c55e" : "#16a34a"; 

  // Mouse parallax
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

  // Initialize data
  const { bgNodes, pathNodes, bgVelocities, pathVelocities } = useMemo(() => {
    const bg = [];
    const bgV = [];
    for (let i = 0; i < BG_PARTICLE_COUNT; i++) {
      bg.push(new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 10 - 2
      ));
      bgV.push(new THREE.Vector3(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      ));
    }

    const path = [];
    const pathV = [];
    // Create a path from left to right
    for (let i = 0; i < PATH_NODE_COUNT; i++) {
      const t = i / (PATH_NODE_COUNT - 1); // 0 to 1
      const x = -14 + t * 28; // stretch across screen
      const y = Math.sin(t * Math.PI * 1.5) * 4 + (Math.random() - 0.5) * 3;
      const z = Math.cos(t * Math.PI) * 2 + (Math.random() - 0.5) * 2;
      
      path.push(new THREE.Vector3(x, y, z));
      pathV.push(new THREE.Vector3(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      ));
    }

    return { bgNodes: bg, pathNodes: path, bgVelocities: bgV, pathVelocities: pathV };
  }, []);

  // Buffers for rendering
  const bgPositions = useMemo(() => new Float32Array(BG_PARTICLE_COUNT * 3), []);
  const pathPositions = useMemo(() => new Float32Array(PATH_NODE_COUNT * 3), []);
  
  const maxBgLines = 600; 
  const bgLinePositions = useMemo(() => new Float32Array(maxBgLines * 2 * 3), []);
  const bgLineColors = useMemo(() => new Float32Array(maxBgLines * 2 * 3), []);
  const pathLinePositions = useMemo(() => new Float32Array((PATH_NODE_COUNT - 1) * 2 * 3), []);

  useFrame((state) => {
    if (!bgPointsRef.current || !pathPointsRef.current || !bgLinesRef.current || !pathLinesRef.current) return;

    const time = state.clock.elapsedTime;
    
    // 1. Update positions with organic floating (sine waves)
    for (let i = 0; i < BG_PARTICLE_COUNT; i++) {
      const base = bgNodes[i];
      const phase = bgVelocities[i];
      bgPositions[i * 3] = base.x + Math.sin(time * 0.15 + phase.x) * 1.2;
      bgPositions[i * 3 + 1] = base.y + Math.cos(time * 0.18 + phase.y) * 1.2;
      bgPositions[i * 3 + 2] = base.z + Math.sin(time * 0.12 + phase.z) * 1.2;
    }

    for (let i = 0; i < PATH_NODE_COUNT; i++) {
      const base = pathNodes[i];
      const phase = pathVelocities[i];
      pathPositions[i * 3] = base.x + Math.sin(time * 0.25 + phase.x) * 0.6;
      pathPositions[i * 3 + 1] = base.y + Math.cos(time * 0.3 + phase.y) * 0.6;
      pathPositions[i * 3 + 2] = base.z + Math.sin(time * 0.2 + phase.z) * 0.6;
    }

    bgPointsRef.current.geometry.attributes.position.needsUpdate = true;
    pathPointsRef.current.geometry.attributes.position.needsUpdate = true;

    // 2. Compute background connections
    let bgLineCount = 0;
    let colorPos = 0;
    const baseColor = new THREE.Color(bgColorStr);
    
    // Connect BG to BG
    for (let i = 0; i < BG_PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < BG_PARTICLE_COUNT; j++) {
        if (bgLineCount >= maxBgLines) break;
        
        const dx = bgPositions[i * 3] - bgPositions[j * 3];
        const dy = bgPositions[i * 3 + 1] - bgPositions[j * 3 + 1];
        const dz = bgPositions[i * 3 + 2] - bgPositions[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
          const idx = bgLineCount * 6;
          bgLinePositions[idx] = bgPositions[i * 3];
          bgLinePositions[idx+1] = bgPositions[i * 3 + 1];
          bgLinePositions[idx+2] = bgPositions[i * 3 + 2];
          bgLinePositions[idx+3] = bgPositions[j * 3];
          bgLinePositions[idx+4] = bgPositions[j * 3 + 1];
          bgLinePositions[idx+5] = bgPositions[j * 3 + 2];

          const alpha = Math.max(0.02, 1.0 - Math.sqrt(distSq) / CONNECTION_DISTANCE) * 0.6;
          bgLineColors[colorPos++] = baseColor.r * alpha;
          bgLineColors[colorPos++] = baseColor.g * alpha;
          bgLineColors[colorPos++] = baseColor.b * alpha;
          bgLineColors[colorPos++] = baseColor.r * alpha;
          bgLineColors[colorPos++] = baseColor.g * alpha;
          bgLineColors[colorPos++] = baseColor.b * alpha;

          bgLineCount++;
        }
      }
    }
    
    // Connect Path nodes to nearby BG nodes to integrate the path into the network
    for (let i = 0; i < PATH_NODE_COUNT; i++) {
      for (let j = 0; j < BG_PARTICLE_COUNT; j++) {
         if (bgLineCount >= maxBgLines) break;
         const dx = pathPositions[i * 3] - bgPositions[j * 3];
         const dy = pathPositions[i * 3 + 1] - bgPositions[j * 3 + 1];
         const dz = pathPositions[i * 3 + 2] - bgPositions[j * 3 + 2];
         const distSq = dx * dx + dy * dy + dz * dz;
         
         if (distSq < (CONNECTION_DISTANCE * 1.5)**2) {
            const idx = bgLineCount * 6;
            bgLinePositions[idx] = pathPositions[i * 3];
            bgLinePositions[idx+1] = pathPositions[i * 3 + 1];
            bgLinePositions[idx+2] = pathPositions[i * 3 + 2];
            bgLinePositions[idx+3] = bgPositions[j * 3];
            bgLinePositions[idx+4] = bgPositions[j * 3 + 1];
            bgLinePositions[idx+5] = bgPositions[j * 3 + 2];
            
            const alpha = Math.max(0.02, 1.0 - Math.sqrt(distSq) / (CONNECTION_DISTANCE * 1.5)) * 0.4;
            bgLineColors[colorPos++] = baseColor.r * alpha;
            bgLineColors[colorPos++] = baseColor.g * alpha;
            bgLineColors[colorPos++] = baseColor.b * alpha;
            bgLineColors[colorPos++] = baseColor.r * alpha;
            bgLineColors[colorPos++] = baseColor.g * alpha;
            bgLineColors[colorPos++] = baseColor.b * alpha;
            
            bgLineCount++;
         }
      }
    }

    bgLinesRef.current.geometry.setDrawRange(0, bgLineCount * 2);
    bgLinesRef.current.geometry.attributes.position.needsUpdate = true;
    bgLinesRef.current.geometry.attributes.color.needsUpdate = true;

    // 3. Compute path lines (sequential)
    for (let i = 0; i < PATH_NODE_COUNT - 1; i++) {
      const idx = i * 6;
      pathLinePositions[idx] = pathPositions[i * 3];
      pathLinePositions[idx+1] = pathPositions[i * 3 + 1];
      pathLinePositions[idx+2] = pathPositions[i * 3 + 2];
      pathLinePositions[idx+3] = pathPositions[(i + 1) * 3];
      pathLinePositions[idx+4] = pathPositions[(i + 1) * 3 + 1];
      pathLinePositions[idx+5] = pathPositions[(i + 1) * 3 + 2];
    }
    pathLinesRef.current.geometry.attributes.position.needsUpdate = true;

    // 4. Update the traveling pulse
    if (pulseRef.current) {
      const pulseSpeed = 1.2;
      const pulseTime = (time * pulseSpeed) % (PATH_NODE_COUNT - 1);
      const pulseIndex = Math.floor(pulseTime);
      const pulseLerp = pulseTime - pulseIndex;
      
      const p1 = new THREE.Vector3(pathPositions[pulseIndex*3], pathPositions[pulseIndex*3+1], pathPositions[pulseIndex*3+2]);
      const p2 = new THREE.Vector3(pathPositions[(pulseIndex+1)*3], pathPositions[(pulseIndex+1)*3+1], pathPositions[(pulseIndex+1)*3+2]);
      
      pulseRef.current.position.lerpVectors(p1, p2, pulseLerp);
    }

    // 5. Parallax overall group
    const targetX = (mousePos.current.x * 2);
    const targetY = (mousePos.current.y * 2);
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Background Nodes */}
      <points ref={bgPointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={BG_PARTICLE_COUNT} array={bgPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color={bgColorStr} size={0.15} transparent opacity={0.5} />
      </points>

      {/* Background Lines */}
      <lineSegments ref={bgLinesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={maxBgLines * 2} array={bgLinePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={maxBgLines * 2} array={bgLineColors} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.6} depthWrite={false} />
      </lineSegments>

      {/* Path Nodes */}
      <points ref={pathPointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={PATH_NODE_COUNT} array={pathPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color={pathColorStr} size={0.4} transparent opacity={0.9} sizeAttenuation={true} />
      </points>

      {/* Path Lines */}
      <lineSegments ref={pathLinesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={(PATH_NODE_COUNT - 1) * 2} array={pathLinePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color={pathColorStr} transparent opacity={0.7} depthWrite={false} />
      </lineSegments>

      {/* Data Pulse */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color={theme === 'dark' ? '#ffffff' : pathColorStr} transparent opacity={0.9} />
      </mesh>
    </>
  );
};

export default function Hero3DCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <NetworkVisualization />
      </Canvas>
    </div>
  );
}
