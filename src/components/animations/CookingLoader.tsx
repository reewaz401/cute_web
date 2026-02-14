'use client'

import { motion } from 'framer-motion'

interface CookingLoaderProps {
  show: boolean
}

const fireworkColors = ['#FF4D4D', '#FFD700', '#4ADE80', '#60A5FA', '#F472B6', '#FBBF24']

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
        {/* Firework animation */}
        <div className="relative w-[150px] h-[150px]">
          {/* Center burst */}
          {fireworkColors.map((color, i) => (
            <motion.div
              key={`burst-${i}`}
              className="absolute left-1/2 top-1/2"
              style={{ transformOrigin: 'center' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            >
              {/* Sparks radiating outward */}
              {[...Array(8)].map((_, j) => {
                const angle = (j / 8) * 360
                const rad = (angle * Math.PI) / 180
                return (
                  <motion.div
                    key={j}
                    className="absolute rounded-full"
                    style={{
                      width: 6,
                      height: 6,
                      backgroundColor: color,
                      boxShadow: `0 0 8px ${color}, 0 0 16px ${color}`,
                    }}
                    animate={{
                      x: [0, Math.cos(rad) * 60],
                      y: [0, Math.sin(rad) * 60],
                      opacity: [1, 0],
                      scale: [1, 0.3],
                    }}
                    transition={{
                      duration: 0.8,
                      ease: 'easeOut',
                    }}
                  />
                )
              })}
            </motion.div>
          ))}

          {/* Rising trail */}
          <motion.div
            className="absolute left-1/2 bottom-0 w-[2px] bg-gradient-to-t from-yellow-400 to-transparent"
            animate={{
              height: [0, 60, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatDelay: 0.8,
            }}
          />

          {/* Sparkle emojis */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
            animate={{
              scale: [0.5, 1.3, 0.5],
              rotate: [0, 180, 360],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            🎆
          </motion.div>
        </div>

        {/* Celebrating text */}
        <motion.p
          className="text-xl md:text-2xl text-yellow-300 font-medium"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Celebrating
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
