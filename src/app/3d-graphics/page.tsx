'use client'

import { motion } from 'framer-motion'
import { Rotating3DBox } from '@/components/animations/Rotating3DBox'

export default function GraphicsPage() {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          3D Graphics
        </h1>
        <p className="text-neutral-600 mb-8">Interactive 3D models and visualizations</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <Rotating3DBox height="400px" />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Rotating Cube</h3>
            <p className="text-neutral-600">Interactive 3D cube with React Three Fiber</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="h-[400px] bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
            <p className="text-white text-xl font-semibold">More 3D Content Coming Soon</p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Advanced Models</h3>
            <p className="text-neutral-600">Complex 3D scenes and interactions</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}