'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function RotatingBox() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <Box ref={meshRef} args={[2, 2, 2]}>
      <meshStandardMaterial 
        color="var(--primary-500)" 
        metalness={0.8}
        roughness={0.2}
      />
    </Box>
  )
}

interface Rotating3DBoxProps {
  className?: string
  height?: string
}

export function Rotating3DBox({ 
  className = '', 
  height = '400px' 
}: Rotating3DBoxProps) {
  return (
    <div className={className} style={{ height }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RotatingBox />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}