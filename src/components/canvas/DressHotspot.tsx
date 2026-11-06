import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { formatCouturePrice, type Product } from '../../data/products';
import { useCartStore } from '../../store/useCartStore';
import { audioEngine } from '../../utils/sound';

interface DressHotspotProps {
  product: Product;
}

export const DressHotspot: React.FC<DressHotspotProps> = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const openProductModal = useCartStore((s) => s.openProductModal);
  const setFocusTarget = useCartStore((s) => s.setFocusTarget);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playHotspotClickSound();
    setFocusTarget(product.position3D);
    openProductModal(product);
  };

  return (
    <group position={product.position3D}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick as unknown as (e: unknown) => void}
      >
        <sphereGeometry args={[hovered ? 0.16 : 0.12, 16, 16]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : '#e8a0b0'}
          emissive={hovered ? '#e8a0b0' : '#c4607e'}
          emissiveIntensity={hovered ? 1.0 : 0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.18, 0.22, 32]} />
        <meshBasicMaterial color="#e8a0b0" transparent opacity={hovered ? 0.8 : 0.3} side={2} />
      </mesh>

      <Html position={[0, 0.3, 0]} center distanceFactor={12} zIndexRange={[100, 0]}>
        <div
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`cursor-pointer transition-all duration-300 transform select-none ${
            hovered ? 'scale-105 -translate-y-1' : 'scale-100'
          }`}
        >
          <div className="glass-panel px-4 py-2 rounded-none flex items-center gap-3 border border-[#e8c3cd] shadow-md hover:border-[#a02e46] bg-white/95">
            <div className="flex flex-col text-left">
              <span className="font-nav text-[9px] uppercase tracking-[0.2em] text-[#3b121e] font-bold">
                {product.name}
              </span>
              <span className="font-serif text-[11px] text-[#a02e46] font-black tracking-wider">
                {formatCouturePrice(product.price)}
              </span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};
