'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'
import CookingLoader from './CookingLoader'

export default function SheepCongratulations() {
  const [showText, setShowText] = useState(false)
  const [congratsText, setCongratsText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    // Show text immediately with "Cooking..."
    setShowText(true)

    // After 4 seconds, fetch congratulations text from API
    const timer = setTimeout(() => {
      const fetchCongratsText = async () => {
        try {
          const response = await fetch('/api/congratulations')
          if (response.ok) {
            const data = await response.json()
            setCongratsText(data.text)
          }
        } catch (error) {
          console.error('Error fetching congratulations text:', error)
          setCongratsText('CONGRATULATIONS')
        } finally {
          setIsLoading(false)
        }
      }

      fetchCongratsText()
    }, 4000) // 4 second delay

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-visible">
      {/* Congratulations text - starts behind sheep (z-10) and moves up */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 z-10 w-full px-4 text-center"
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
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent inline-block">
            {congratsText}
          </span>
        </h1>

        {/* Sparkles and decorations */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={showText ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span className="text-2xl md:text-3xl">✨ 🎉 ✨</span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-center mt-4 text-lg md:text-xl text-gray-600"
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
          transform: isMobile ? 'scale(1.2)' : 'scale(1.5)',
          transformOrigin: 'center bottom'
        }}
        title="Sheep Animation"
      />

      {/* Confetti particles - reduced for mobile */}
      {showText && (
        <>
          {[...Array(isMobile ? 6 : 12)].map((_, i) => (
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

      {/* Cooking loader below */}
      <CookingLoader show={isLoading} />
    </div>
  )
}