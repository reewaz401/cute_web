'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function WalkingSanta() {
  const [position, setPosition] = useState({ x: -100, y: 70 })
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        let newX = prev.x
        let newY = prev.y

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
        setPosition({
          x: Math.random() * 90 + 5,
          y: Math.random() * 20 + 60
        })
      }, 3000)
    }, 20000)

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
          {/* Santa body */}
          <div className="relative w-24 h-32">
            {/* Santa Hat */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
              <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[30px] border-b-red-700" />
              {/* Hat brim (white fur) */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-14 h-4 bg-white rounded-full" />
              {/* Pompom */}
              <motion.div
                className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>

            {/* Head */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-amber-200 rounded-full">
              {/* Eyes */}
              <motion.div
                className="absolute top-3 left-2 w-2 h-2 bg-gray-800 rounded-full"
                animate={{ scaleY: [1, 0.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
              />
              <motion.div
                className="absolute top-3 right-2 w-2 h-2 bg-gray-800 rounded-full"
                animate={{ scaleY: [1, 0.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
              />

              {/* Rosy cheeks */}
              <div className="absolute top-5 left-0 w-3 h-2 bg-pink-300 rounded-full opacity-60" />
              <div className="absolute top-5 right-0 w-3 h-2 bg-pink-300 rounded-full opacity-60" />

              {/* Nose */}
              <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-400 rounded-full" />

              {/* Jolly smile */}
              <motion.div
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
                animate={{ width: ["10px", "14px", "10px"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="h-1 bg-red-400 rounded-full" />
              </motion.div>

              {/* Beard */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-14 h-8 bg-white rounded-b-full" />
            </div>

            {/* Body/Coat */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-red-700"
                 style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}>
              {/* Belt */}
              <div className="absolute top-6 left-0 right-0 h-2 bg-black" />
              <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-yellow-400 rounded-sm" />
              {/* White fur trim */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-white" />
            </div>

            {/* Arms */}
            <motion.div
              className="absolute top-16 -left-2 w-8 h-2 bg-red-700 origin-right rounded-full"
              animate={{ rotate: [0, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-16 -right-2 w-8 h-2 bg-red-700 origin-left rounded-full"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            />

            {/* Gift sack */}
            <motion.div
              className="absolute top-10 -right-10 transform"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-10 h-12 bg-red-900 rounded-lg relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-yellow-600 rounded-t-lg" />
                <span className="absolute top-3 left-1/2 transform -translate-x-1/2 text-xs">🎁</span>
              </div>
            </motion.div>

            {/* Walking legs */}
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2"
              animate={{ x: [-2, 2, -2] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <motion.div
                className="w-3 h-5 bg-black rounded-b-lg"
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              <motion.div
                className="w-3 h-5 bg-black rounded-b-lg"
                animate={{ rotate: [5, -5, 5] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Snowflake trail */}
            <motion.div
              className="absolute top-10 -left-10"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-white text-lg">❄</span>
            </motion.div>
            <motion.div
              className="absolute top-14 -left-14"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            >
              <span className="text-blue-200 text-sm">✦</span>
            </motion.div>
            <motion.div
              className="absolute top-12 -left-18"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            >
              <span className="text-yellow-300 text-md">⭐</span>
            </motion.div>
          </div>

          {/* Ho Ho Ho speech bubble */}
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
            <div className="bg-red-800 text-white px-2 py-1 rounded-lg text-xs whitespace-nowrap">
              Ho Ho Ho!
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-red-800" />
          </motion.div>

          {/* Reindeer companion (occasionally) */}
          {Math.random() > 0.7 && (
            <motion.div
              className="absolute top-20 -left-8"
              animate={{
                x: [-5, 5, -5],
                y: [0, -2, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-2xl">🦌</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Star flying around Santa */}
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
          <span className="text-xl">⭐</span>
        </motion.div>
      </motion.div>
    </div>
  )
}
