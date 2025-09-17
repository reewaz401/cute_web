'use client'

import { motion } from 'framer-motion'

export default function GalleryPage() {
  const images = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Project ${i + 1}`,
    category: ['Design', 'Animation', '3D', 'UI/UX'][i % 4]
  }))

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          Gallery
        </h1>
        <p className="text-neutral-600 mb-8">Browse our collection of creative works</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <div className={`
                h-64 bg-gradient-to-br
                ${index % 4 === 0 ? 'from-purple-400 to-pink-400' : ''}
                ${index % 4 === 1 ? 'from-pink-400 to-rose-400' : ''}
                ${index % 4 === 2 ? 'from-green-400 to-teal-400' : ''}
                ${index % 4 === 3 ? 'from-orange-400 to-red-400' : ''}
              `} />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="text-white text-center"
                >
                  <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                  <p className="text-sm">{image.category}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}