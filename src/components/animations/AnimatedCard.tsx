'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function AnimatedCard({ 
  children, 
  delay = 0, 
  className = '' 
}: AnimatedCardProps) {
  return (
    <motion.div
      className={`rounded-lg p-6 shadow-lg ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-default)',
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    >
      {children}
    </motion.div>
  )
}