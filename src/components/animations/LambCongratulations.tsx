'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LambCongratulations() {
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const congratsLetters = "CONGRATULATIONS".split("")

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background sparkles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: [0, (i % 2 === 0 ? 50 : -50) * (i + 1)],
              y: [0, -30 * (i + 1)]
            }}
            transition={{
              duration: 3,
              delay: 2 + i * 0.2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: '50%'
            }}
          />
        ))}
      </div>

      {/* Lamb character */}
      <motion.div
        initial={{ x: -500, rotate: 0 }}
        animate={{
          x: showText ? -100 : 0,
          rotate: showText ? [0, -5, 5, -5, 0] : 0
        }}
        transition={{
          x: { type: "spring", stiffness: 50, damping: 20, duration: 2 },
          rotate: { duration: 0.5, delay: 1.5 }
        }}
        className="relative z-10"
      >
        {/* Lamb body */}
        <div className="relative">
          {/* Body */}
          <motion.div
            className="w-32 h-24 bg-white rounded-full relative shadow-lg"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Fluffy texture circles */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-6 h-6 bg-white rounded-full border border-gray-200"
                  style={{
                    left: `${15 + (i % 4) * 20}%`,
                    top: `${20 + Math.floor(i / 4) * 30}%`,
                    transform: 'scale(0.9)'
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Head */}
          <motion.div
            className="absolute -top-2 right-0 w-20 h-20 bg-white rounded-full shadow-lg z-20"
            animate={{
              y: [0, -3, 0],
              rotate: showText ? [0, -10, 10, 0] : 0
            }}
            transition={{
              y: { duration: 2, repeat: Infinity },
              rotate: { duration: 1, delay: 1.5 }
            }}
          >
            {/* Eyes */}
            <div className="absolute top-6 left-4 w-2 h-3 bg-black rounded-full" />
            <div className="absolute top-6 right-4 w-2 h-3 bg-black rounded-full" />

            {/* Happy closed eyes when showing text */}
            {showText && (
              <>
                <motion.div
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0.2 }}
                  className="absolute top-6 left-4 w-2 h-3 bg-black rounded-full"
                />
                <motion.div
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0.2 }}
                  className="absolute top-6 right-4 w-2 h-3 bg-black rounded-full"
                />
              </>
            )}

            {/* Nose */}
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-pink-400 rounded-full" />

            {/* Ears */}
            <div className="absolute -top-1 left-2 w-4 h-6 bg-white rounded-full transform rotate-[-20deg] shadow-md" />
            <div className="absolute -top-1 right-2 w-4 h-6 bg-white rounded-full transform rotate-[20deg] shadow-md" />
          </motion.div>

          {/* Legs */}
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute bottom-0 left-4 w-3 h-8 bg-gray-800 rounded-full"
          />
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
            className="absolute bottom-0 left-10 w-3 h-8 bg-gray-800 rounded-full"
          />
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
            className="absolute bottom-0 right-10 w-3 h-8 bg-gray-800 rounded-full"
          />
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }}
            className="absolute bottom-0 right-4 w-3 h-8 bg-gray-800 rounded-full"
          />

          {/* Tail */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute top-8 -left-4 w-8 h-8 bg-white rounded-full shadow-md"
          />
        </div>

        {/* Banner/Sign the lamb is carrying */}
        {!showText && (
          <motion.div
            className="absolute -right-16 top-0 w-20 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg shadow-lg flex items-center justify-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-white text-xs font-bold">For You!</span>
          </motion.div>
        )}
      </motion.div>

      {/* Congratulations Text */}
      {showText && (
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex space-x-1">
            {congratsLetters.map((letter, index) => (
              <motion.span
                key={index}
                className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                initial={{ y: 50, opacity: 0, rotate: -180 }}
                animate={{
                  y: [50, -20, 0],
                  opacity: 1,
                  rotate: 0,
                  scale: [0, 1.2, 1]
                }}
                transition={{
                  delay: 1.8 + index * 0.05,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Exclamation marks */}
          <motion.div
            className="text-center mt-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: [0, 1.5, 1] }}
            transition={{ delay: 3, duration: 0.5 }}
          >
            <span className="text-4xl">🎉 🎊 🎉</span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-center mt-4 text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.5 }}
          >
          </motion.p>
        </motion.div>
      )}
    </div>
  )
}