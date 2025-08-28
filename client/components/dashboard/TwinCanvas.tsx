import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Vec3 = [number, number, number];

type RiskMap = Record<"heart" | "liver" | "brain" | "lungs", number>; // 0..1

function riskColor(r: number) {
  // map risk to color: low aqua -> mid yellow -> high red
  const c = r < 0.33 ? new THREE.Color("#22d3ee") : r < 0.66 ? new THREE.Color("#eab308") : new THREE.Color("#f43f5e");
  return c;
}

function Organ({ name, position, baseColor, risk, onClick }: { name: keyof RiskMap; position: Vec3; baseColor: string; risk: number; onClick: () => void }) {
  const ref = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const s = 1 + Math.sin(t * (1.5 + risk * 3)) * 0.08 * (0.3 + risk);
    if (ref.current) ref.current.scale.setScalar(s);
    if (ringRef.current) ringRef.current.material.opacity = 0.15 + Math.abs(Math.sin(t * 1.2)) * 0.25 * risk;
  });
  const col = riskColor(risk);
  return (
    <group position={position}>
      <mesh
        ref={ref}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color={baseColor} emissive={col} emissiveIntensity={0.8 + risk * 1.2} />
      </mesh>
      {/* aura ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.18, 0]}>
        <ringGeometry args={[0.22, 0.34, 32]} />
        <meshBasicMaterial color={col} transparent opacity={0.2} />
      </mesh>
      {hovered && (
        <Html center distanceFactor={8} className="pointer-events-none">
          <div className="px-2 py-1 text-xs rounded bg-black/70 border border-white/10">
            {name.toUpperCase()} risk {(risk * 100).toFixed(0)}%
          </div>
        </Html>
      )}
    </group>
  );
}

function Body({ risks, gender }: { risks: RiskMap; gender: Gender }) {
  const navigate = useNavigate();
  const organs = useMemo(
    () => [
      { key: "heart", pos: [0, 0.4, 0] as Vec3, color: "#94a3b8" },
      { key: "liver", pos: [0.3, 0.2, 0] as Vec3, color: "#94a3b8" },
      { key: "brain", pos: [0, 1.1, 0] as Vec3, color: "#94a3b8" },
      { key: "lungs", pos: [-0.3, 0.4, 0] as Vec3, color: "#94a3b8" },
    ],
    [],
  ) as { key: keyof RiskMap; pos: Vec3; color: string }[];
  return (
    <group>
      {/* torso */}
      <mesh position={[0, 0.4, 0]}>
        {/* torso dimensions vary by gender */}
        <cylinderGeometry args={[gender === "female" ? 0.46 : 0.5, gender === "female" ? 0.62 : 0.6, 1.2, 24]} />
        <meshStandardMaterial color="#1f2937" metalness={0.2} roughness={0.6} />
      </mesh>
      {/* head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#1f2937" metalness={0.2} roughness={0.6} />
      </mesh>
      {/* limbs */}
      <mesh position={[-0.6, 0.3, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[gender === "female" ? 0.1 : 0.12, gender === "female" ? 0.1 : 0.12, 1, 16]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      <mesh position={[0.6, 0.3, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[gender === "female" ? 0.1 : 0.12, gender === "female" ? 0.1 : 0.12, 1, 16]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      {/* organs with risk */}
      {organs.map((o) => {
        // slight organ position adjustments for female
        const pos: Vec3 = [...o.pos] as Vec3;
        if (gender === "female") {
          if (o.key === "heart") pos[1] += 0.02;
          if (o.key === "liver") pos[0] += 0.02;
          if (o.key === "lungs") pos[1] += 0.03;
        }
        return (
          <Organ
            key={o.key}
            name={o.key}
            position={pos}
            baseColor={o.color}
            risk={risks[o.key]}
            onClick={() => navigate(`/vitals?organ=${o.key}`)}
          />
        );
      })}
    </group>
  );
}

export type Gender = "male" | "female";
export default function TwinCanvas({ modifier = 0, gender = "male" }: { modifier?: number; gender?: Gender }) {
  // baseline risks
  const base: RiskMap = { heart: 0.35, liver: 0.22, brain: 0.18, lungs: 0.27 };
  const risks: RiskMap = useMemo(() => {
    const adj = (r: number) => Math.max(0.05, Math.min(0.95, r - modifier * 0.005 + (Math.random() - 0.5) * 0.02));
    return {
      heart: adj(base.heart),
      liver: adj(base.liver),
      brain: adj(base.brain),
      lungs: adj(base.lungs),
    } as RiskMap;
    // modifier dependency intentionally omitted from deps to avoid re-randomizing on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modifier]);

  return (
    <div className="glass rounded-2xl border border-white/10 overflow-hidden">
      <Canvas camera={{ position: [2.2, 1.4, 2.2], fov: 50 }} style={{ height: 420 }}>
        <ambientLight intensity={0.9} />
        <hemisphereLight args={[0xffffff, 0x101010, 0.6]} />
        <directionalLight position={[3, 3, 2]} intensity={1.6} color="#22d3ee" />
        <directionalLight position={[-3, 3, -2]} intensity={1.2} color="#a78bfa" />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
          <circleGeometry args={[2.2, 32]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
        <Body risks={risks} gender={gender} />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
      <div className="p-3 text-xs text-muted-foreground flex items-center gap-3">
        <div className="flex items-center gap-1"><span className="inline-block size-3 rounded-full bg-[#22d3ee]"/> Low</div>
        <div className="flex items-center gap-1"><span className="inline-block size-3 rounded-full bg-[#eab308]"/> Medium</div>
        <div className="flex items-center gap-1"><span className="inline-block size-3 rounded-full bg-[#f43f5e]"/> High</div>
      </div>
    </div>
  );
}
