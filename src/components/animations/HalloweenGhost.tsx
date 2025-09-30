'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'
import CookingLoader from './CookingLoader'

export default function HalloweenGhost() {
  const [showText, setShowText] = useState(false)
  const [spookyText, setSpookyText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    // Show text immediately with "Cooking..."
    setShowText(true)

    // After 4 seconds, fetch text from database API
    const timer = setTimeout(() => {
      const fetchSpookyText = async () => {
        try {
          const response = await fetch('/api/congratulations')
          if (response.ok) {
            const data = await response.json()
            // Use the actual database message
            setSpookyText(data.text || 'HAPPY HALLOWEEN!')
          }
        } catch (error) {
          console.error('Error fetching text:', error)
          setSpookyText('HAPPY HALLOWEEN!')
        } finally {
          setIsLoading(false)
        }
      }

      fetchSpookyText()
    }, 4000) // 4 second delay

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-visible">
      {/* Halloween text - main content from database */}
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
          <span className="bg-gradient-to-r from-orange-500 via-purple-600 to-orange-500 bg-clip-text text-transparent inline-block">
            {spookyText}
          </span>
        </h1>

        {/* Spooky decorations */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={showText ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span className="text-2xl md:text-3xl">🦇 🎃 👻 🎃 🦇</span>
        </motion.div>

      </motion.div>

      {/* Animated bats in background */}
      {showText && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{
                opacity: 0,
                x: '50%',
                y: '50%'
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
              }}
              transition={{
                duration: 4,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              🦇
            </motion.div>
          ))}
        </div>
      )}

      {/* Floating Ghost - decorative background element */}
      <motion.div
        className="absolute right-10 bottom-10 z-0"
        initial={{ x: 100, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 0.15,
          y: [0, -30, 0]
        }}
        transition={{
          x: { duration: 2, type: "spring" },
          opacity: { duration: 2 },
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <div className="relative">
          {/* Ghost body */}
          <motion.div
            className="relative"
            animate={{
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width={isMobile ? "120" : "150"} height={isMobile ? "150" : "180"} viewBox="0 0 150 180">
              {/* Ghost main body */}
              <path
                d="M75 20 C35 20, 20 50, 20 80 L20 140 C20 145, 25 150, 30 145 C35 140, 40 145, 45 140 C50 145, 55 140, 60 145 C65 140, 70 145, 75 140 C80 145, 85 140, 90 145 C95 140, 100 145, 105 140 C110 145, 115 140, 120 145 C125 150, 130 145, 130 140 L130 80 C130 50, 115 20, 75 20 Z"
                fill="white"
                stroke="#E8E8E8"
                strokeWidth="2"
                opacity="0.95"
              />

              {/* Ghost face */}
              {/* Eyes */}
              <circle cx="55" cy="60" r="8" fill="#1a1a2e" />
              <circle cx="95" cy="60" r="8" fill="#1a1a2e" />
              <circle cx="57" cy="58" r="3" fill="white" />
              <circle cx="97" cy="58" r="3" fill="white" />

              {/* Cute mouth */}
              <path
                d="M60 80 Q75 90, 90 80"
                fill="none"
                stroke="#1a1a2e"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Blush */}
              <circle cx="40" cy="70" r="8" fill="#FFB6C1" opacity="0.4" />
              <circle cx="110" cy="70" r="8" fill="#FFB6C1" opacity="0.4" />

              {/* Little bow tie */}
              <path
                d="M65 100 L75 95 L85 100 L75 105 Z"
                fill="#FF6B35"
                stroke="#D35400"
                strokeWidth="1"
              />
            </svg>
          </motion.div>

          {/* Ghost glow effect */}
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full bg-white rounded-full blur-3xl" />
          </motion.div>
        </div>
      </motion.div>

      {/* Spider dropping animations */}
      {showText && (
        <>
          {[...Array(isMobile ? 3 : 5)].map((_, i) => (
            <motion.div
              key={`spider-${i}`}
              className="absolute pointer-events-none"
              style={{
                left: `${15 + i * 20}%`,
                top: 0,
              }}
              initial={{ y: -50 }}
              animate={{
                y: [0, Math.random() * 200 + 100, Math.random() * 150 + 50],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Spider web string */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-[1px] bg-gray-400 opacity-30"
                style={{ height: '300px', top: '-300px' }} />

              {/* Spider */}
              <div className="relative">
                <span className="text-2xl">🕷️</span>
              </div>
            </motion.div>
          ))}
        </>
      )}

      {/* Floating pumpkins */}
      {showText && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`pumpkin-${i}`}
              className="absolute text-3xl"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                bottom: 0,
              }}
              animate={{
                y: [0, -(window.innerHeight + 100)],
                x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100],
                rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)]
              }}
              transition={{
                duration: 6 + Math.random() * 3,
                delay: 1 + i * 0.8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              🎃
            </motion.div>
          ))}
        </>
      )}

      {/* Cooking loader below */}
      <CookingLoader show={isLoading} />
    </div>
  )
}