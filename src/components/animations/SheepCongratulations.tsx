'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function SheepCongratulations() {
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    // Show text when sheep reaches middle (after ~4.8s based on animation timing)
    // The sheep animation takes 4.8s to move in
    const timer = setTimeout(() => {
      setShowText(true)
    }, 4800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Congratulations text - starts behind sheep (z-10) and moves up */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 z-10"
        initial={{
          opacity: 0,
          y: 100,
          scale: 0.3,
          z: -100
        }}
        animate={showText ? {
          opacity: 1,
          y: -50,
          scale: 1,
          z: 0
        } : {}}
        transition={{
          duration: 1.5,
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
      >
        <h1 className="text-6xl md:text-8xl font-bold">
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            CONGRATULATIONS
          </span>
        </h1>

        {/* Sparkles and decorations */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={showText ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span className="text-3xl">✨ 🎉 ✨</span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-center mt-4 text-xl text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
        >
        </motion.p>
      </motion.div>

      {/* Animated sparkles in background */}
      {showText && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              initial={{
                opacity: 0,
                scale: 0,
                x: '50%',
                y: '50%'
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.5, 1.5, 0],
                x: `${50 + (Math.random() - 0.5) * 60}%`,
                y: `${50 + (Math.random() - 0.5) * 60}%`
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          ))}
        </div>
      )}

      {/* Sheep animation iframe - z-20 to be in front initially */}
      <iframe
        src="/animations/sheep_walk_in_sit_true_small.html"
        className="absolute inset-0 w-full h-full border-0 z-20 pointer-events-none"
        style={{
          background: 'transparent',
          transform: 'scale(1.5)',
          transformOrigin: 'center bottom'
        }}
        title="Sheep Animation"
      />

      {/* Confetti particles */}
      {showText && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`confetti-${i}`}
              className={`absolute w-3 h-3 ${
                i % 3 === 0 ? 'bg-purple-500' : i % 3 === 1 ? 'bg-pink-500' : 'bg-orange-500'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                borderRadius: Math.random() > 0.5 ? '50%' : '0%'
              }}
              animate={{
                y: [0, window.innerHeight + 100],
                x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
                rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: 0.5 + i * 0.1,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}