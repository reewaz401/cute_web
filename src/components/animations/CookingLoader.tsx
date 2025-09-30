'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface CookingLoaderProps {
  show: boolean
}

export default function CookingLoader({ show }: CookingLoaderProps) {
  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute left-1/2 top-[60%] transform -translate-x-1/2 z-20"
    >
      <div className="flex flex-col items-center gap-3">
        {/* Hot tub cooking GIF */}
        <div className="relative">
          <Image
            src="/animations/hot_tub_cooked.gif"
            alt="Cooking..."
            width={150}
            height={150}
            className="rounded-lg"
            unoptimized
          />
        </div>

        {/* Cooking text */}
        <motion.p
          className="text-xl md:text-2xl text-orange-400 font-medium"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Cooking
          <motion.span
            animate={{
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              times: [0, 0.33, 0.66, 1],
            }}
          >
            ...
          </motion.span>
        </motion.p>
      </div>
    </motion.div>
  )
}