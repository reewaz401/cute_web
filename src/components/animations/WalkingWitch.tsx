'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function WalkingWitch() {
  const [position, setPosition] = useState({ x: -100, y: 70 })
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Random walk pattern
    const interval = setInterval(() => {
      setPosition(prev => {
        let newX = prev.x
        let newY = prev.y

        // Move horizontally
        if (direction === 'right') {
          newX = prev.x + 1
          if (newX > 95) {
            setDirection('left')
            newX = 95
          }
        } else {
          newX = prev.x - 1
          if (newX < 5) {
            setDirection('right')
            newX = 5
          }
        }

        // Slight vertical bobbing
        newY = 65 + Math.sin(newX / 5) * 5

        return { x: newX, y: newY }
      })
    }, 50)

    return () => clearInterval(interval)
  }, [direction])

  // Occasionally hide and reappear
  useEffect(() => {
    const hideInterval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setIsVisible(true)
        // Teleport to new position
        setPosition({
          x: Math.random() * 90 + 5,
          y: Math.random() * 20 + 60
        })
      }, 3000)
    }, 20000) // Hide every 20 seconds

    return () => clearInterval(hideInterval)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-40 hidden md:block">
      <motion.div
        animate={{
          left: `${position.x}%`,
          top: `${position.y}%`
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0.05
        }}
        className="absolute"
        style={{
          transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'
        }}
      >
        <div className="relative">
          {/* Witch body */}
          <div className="relative w-24 h-32">
            {/* Hat */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-purple-900" />
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-14 h-3 bg-purple-900 rounded-full" />
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-500 rounded-sm" />
              {/* Stars on hat */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-yellow-300 text-xs">✦</div>
            </div>

            {/* Head */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-green-600 rounded-full">
              {/* Eyes */}
              <div className="absolute top-3 left-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <div className="absolute top-3 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />

              {/* Nose */}
              <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-green-700 rounded-full"
                   style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />

              {/* Evil grin */}
              <motion.div
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
                animate={{ width: ["8px", "12px", "8px"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="h-1 bg-black rounded-full" />
              </motion.div>

              {/* Wart */}
              <div className="absolute top-6 right-1 w-1 h-1 bg-green-800 rounded-full" />
            </div>

            {/* Hair */}
            <div className="absolute top-8 left-1 w-2 h-8 bg-gray-600 transform rotate-12" />
            <div className="absolute top-8 right-1 w-2 h-8 bg-gray-600 transform -rotate-12" />

            {/* Body/Robe */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-black"
                 style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}>
              {/* Purple details on robe */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-purple-700" />
              <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-purple-700" />
            </div>

            {/* Arms */}
            <motion.div
              className="absolute top-16 -left-2 w-8 h-2 bg-green-600 origin-right"
              animate={{ rotate: [0, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-16 -right-2 w-8 h-2 bg-green-600 origin-left"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            />

            {/* Broom */}
            <div className="absolute top-14 -right-8 transform rotate-45">
              {/* Broom stick */}
              <div className="w-20 h-1 bg-yellow-900" />
              {/* Broom bristles */}
              <div className="absolute -right-3 -top-2 w-6 h-5 bg-yellow-700"
                   style={{ clipPath: 'polygon(0% 50%, 100% 0%, 100% 100%)' }}>
                <div className="absolute top-0 left-0 w-full h-full opacity-50">
                  <div className="h-1 bg-yellow-600 mt-1" />
                  <div className="h-1 bg-yellow-600 mt-1" />
                </div>
              </div>
            </div>

            {/* Walking animation - legs */}
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2"
              animate={{ x: [-2, 2, -2] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <motion.div
                className="w-2 h-4 bg-black"
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              <motion.div
                className="w-2 h-4 bg-black"
                animate={{ rotate: [5, -5, 5] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Magic sparkles trailing behind */}
            <motion.div
              className="absolute top-10 -left-10"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="text-purple-400 text-lg">✨</span>
            </motion.div>
            <motion.div
              className="absolute top-14 -left-14"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
            >
              <span className="text-yellow-400 text-sm">⭐</span>
            </motion.div>
            <motion.div
              className="absolute top-12 -left-18"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
            >
              <span className="text-purple-300 text-md">✦</span>
            </motion.div>
          </div>

          {/* Occasional cackle */}
          <motion.div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              y: [0, -10, -10, -20]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 10,
              times: [0, 0.1, 0.9, 1]
            }}
          >
            <div className="bg-purple-900 text-white px-2 py-1 rounded-lg text-xs whitespace-nowrap">
              Hehe he he!
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-purple-900" />
          </motion.div>

          {/* Cat companion (occasionally) */}
          {Math.random() > 0.7 && (
            <motion.div
              className="absolute top-20 -left-8"
              animate={{
                x: [-5, 5, -5],
                y: [0, -2, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-2xl">🐈‍⬛</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Bat friends flying around witch */}
      <motion.div
        className="absolute"
        animate={{
          left: `${position.x - 5}%`,
          top: `${position.y - 10}%`
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0.05
        }}
      >
        <motion.div
          animate={{
            x: [0, 20, 0, -20, 0],
            y: [0, -10, -5, -10, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <span className="text-xl">🦇</span>
        </motion.div>
      </motion.div>
    </div>
  )
}