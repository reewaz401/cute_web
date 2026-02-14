'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'
import CookingLoader from './CookingLoader'

export default function ChristmasNewYear() {
  const [showText, setShowText] = useState(false)
  const [greetingText, setGreetingText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useIsMobile()

  // Pre-generate random values for snowflakes
  const snowflakes = useMemo(() =>
    [...Array(isMobile ? 15 : 25)].map((_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      size: Math.random() > 0.5 ? 'text-lg' : 'text-sm',
      emoji: ['❄', '❅', '❆', '✦'][Math.floor(Math.random() * 4)]
    })), [isMobile]
  )

  // Pre-generate random values for fireworks
  const fireworks = useMemo(() =>
    [...Array(6)].map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 60,
      delay: i * 0.8,
      color: ['text-red-400', 'text-yellow-300', 'text-green-400', 'text-blue-400', 'text-pink-400', 'text-amber-300'][i]
    })), []
  )

  // Pre-generate random values for presents
  const presents = useMemo(() =>
    [...Array(4)].map((_, i) => ({
      left: Math.random() * 80 + 10,
      xOffset1: (Math.random() - 0.5) * 50,
      xOffset2: (Math.random() - 0.5) * 100,
      rotateDir: Math.random() > 0.5 ? 1 : -1,
      duration: 6 + Math.random() * 3,
      emoji: ['🎁', '🎀', '🧦', '🎄'][i % 4]
    })), []
  )

  useEffect(() => {
    setShowText(true)

    const timer = setTimeout(() => {
      const fetchGreeting = async () => {
        try {
          const response = await fetch('/api/congratulations')
          if (response.ok) {
            const data = await response.json()
            setGreetingText(data.text || 'MERRY CHRISTMAS & HAPPY NEW YEAR!')
          }
        } catch (error) {
          console.error('Error fetching text:', error)
          setGreetingText('MERRY CHRISTMAS & HAPPY NEW YEAR!')
        } finally {
          setIsLoading(false)
        }
      }

      fetchGreeting()
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-visible">
      {/* Main greeting text */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 z-30 w-full px-4 text-center"
        initial={{
          opacity: 0,
          y: 50,
          scale: 0.8,
        }}
        animate={showText ? {
          opacity: 1,
          y: -80,
          scale: 1,
        } : {}}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 120,
          damping: 15
        }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
          <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 bg-clip-text text-transparent inline-block">
            {greetingText}
          </span>
        </h1>

        {/* Festive decorations */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={showText ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span className="text-2xl md:text-3xl">🎄 🎅 ⭐ 🎁 🎄</span>
        </motion.div>

        {/* New Year countdown sparkle */}
        <motion.div
          className="text-center mt-2"
          initial={{ opacity: 0 }}
          animate={showText ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="text-lg md:text-xl text-yellow-300">✨ 2026 ✨</span>
        </motion.div>
      </motion.div>

      {/* Snowfall */}
      {showText && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {snowflakes.map((flake, i) => (
            <motion.div
              key={`snow-${i}`}
              className={`absolute ${flake.size} text-white opacity-70`}
              style={{ left: `${flake.left}%` }}
              initial={{ y: -20, opacity: 0 }}
              animate={{
                y: ['-5%', '110%'],
                opacity: [0, 0.8, 0.8, 0],
                x: [0, Math.sin(i) * 30, 0],
              }}
              transition={{
                duration: flake.duration,
                delay: flake.delay,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {flake.emoji}
            </motion.div>
          ))}
        </div>
      )}

      {/* Christmas Tree - decorative background */}
      <motion.div
        className="absolute right-10 bottom-10 z-0"
        initial={{ x: 100, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 0.2,
        }}
        transition={{
          x: { duration: 2, type: "spring" },
          opacity: { duration: 2 },
        }}
      >
        <div className="relative">
          <motion.div
            className="relative"
            animate={{
              rotate: [-1, 1, -1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width={isMobile ? "120" : "150"} height={isMobile ? "180" : "220"} viewBox="0 0 150 220">
              {/* Star on top */}
              <motion.polygon
                points="75,5 80,25 100,25 84,35 90,55 75,43 60,55 66,35 50,25 70,25"
                fill="#FFD700"
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ transformOrigin: '75px 30px' }}
              />

              {/* Tree layers */}
              <polygon points="75,40 35,90 115,90" fill="#166534" />
              <polygon points="75,70 25,130 125,130" fill="#15803D" />
              <polygon points="75,105 15,175 135,175" fill="#14532D" />

              {/* Trunk */}
              <rect x="65" y="175" width="20" height="30" fill="#92400E" />

              {/* Ornaments */}
              <circle cx="60" cy="80" r="4" fill="#DC2626" />
              <circle cx="90" cy="85" r="4" fill="#FFD700" />
              <circle cx="50" cy="120" r="4" fill="#3B82F6" />
              <circle cx="100" cy="115" r="4" fill="#DC2626" />
              <circle cx="75" cy="100" r="4" fill="#FFD700" />
              <circle cx="40" cy="155" r="4" fill="#FFD700" />
              <circle cx="85" cy="150" r="4" fill="#DC2626" />
              <circle cx="110" cy="160" r="4" fill="#3B82F6" />
              <circle cx="65" cy="145" r="4" fill="#22C55E" />
            </svg>
          </motion.div>

          {/* Tree glow */}
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full bg-green-400 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </motion.div>

      {/* Fireworks / New Year sparkles */}
      {showText && (
        <div className="absolute inset-0 pointer-events-none">
          {fireworks.map((fw, i) => (
            <motion.div
              key={`firework-${i}`}
              className={`absolute ${fw.color}`}
              style={{
                left: `${fw.x}%`,
                top: `${fw.y}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: fw.delay,
                repeat: Infinity,
                repeatDelay: 4,
              }}
            >
              <span className="text-2xl">✦</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Floating presents */}
      {showText && (
        <>
          {presents.map((present, i) => (
            <motion.div
              key={`present-${i}`}
              className="absolute text-3xl"
              style={{
                left: `${present.left}%`,
                bottom: 0,
              }}
              animate={{
                y: [0, -600],
                x: [present.xOffset1, present.xOffset2],
                rotate: [0, 360 * present.rotateDir]
              }}
              transition={{
                duration: present.duration,
                delay: 1 + i * 0.8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {present.emoji}
            </motion.div>
          ))}
        </>
      )}

      {/* Twinkling stars in background */}
      {showText && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute text-yellow-300"
              style={{
                left: `${10 + i * 12}%`,
                top: `${5 + (i % 3) * 15}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-sm">⭐</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Cooking loader */}
      <CookingLoader show={isLoading} />
    </div>
  )
}
