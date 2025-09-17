'use client'

import { motion } from 'framer-motion'
import { AnimatedCard } from '@/components/animations/AnimatedCard'

export default function AnimationsPage() {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          Animations Showcase
        </h1>
        <p className="text-neutral-600 mb-8">Explore various animation techniques and effects</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <AnimatedCard key={i} delay={i * 0.1}>
            <motion.div
              className="h-40 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <h3 className="text-lg font-semibold mb-2">Animation {i}</h3>
            <p className="text-neutral-600 text-sm">
              Interactive animation example with smooth transitions
            </p>
          </AnimatedCard>
        ))}
      </div>
    </div>
  )
}