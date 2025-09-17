'use client'

import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function JumpingSheep() {
  const [position, setPosition] = useState({ x: 50, y: 80 }) // Start at bottom
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const [isJumping, setIsJumping] = useState(false)
  const controls = useAnimation()

  // Physics constants
  const GRAVITY = 0.3
  const JUMP_FORCE = -8
  const HORIZONTAL_SPEED = 2
  const GROUND_LEVEL = 80 // percentage from top
  const CEILING_LEVEL = 10 // percentage from top
  const DAMPING = 0.5 // Bounce damping factor

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        let newY = prev.y + velocity.y
        let newX = prev.x + velocity.x

        // Apply gravity
        let newVelY = velocity.y + GRAVITY
        let newVelX = velocity.x * 0.95 // Friction

        // Hit ground
        if (newY >= GROUND_LEVEL) {
          newY = GROUND_LEVEL
          if (Math.abs(newVelY) > 0.5) {
            newVelY = -newVelY * DAMPING // Small bounce with damping
          } else {
            newVelY = 0 // Stop bouncing
            newVelX = 0 // Stop horizontal movement on ground
          }
          setIsJumping(false)
        }

        // Bounce off ceiling
        if (newY <= CEILING_LEVEL) {
          newY = CEILING_LEVEL
          newVelY = Math.abs(newVelY) * 0.5
        }

        // Bounce off walls
        if (newX <= 5 || newX >= 95) {
          newVelX = -newVelX
          newX = newX <= 5 ? 5 : 95
        }

        setVelocity({ x: newVelX, y: newVelY })
        return { x: newX, y: newY }
      })
    }, 30)

    return () => clearInterval(interval)
  }, [velocity])

  const handleJump = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    // Only jump if on the ground
    if (position.y >= GROUND_LEVEL - 5) {
      // Jump straight up with slight random horizontal movement
      setVelocity({
        x: (Math.random() - 0.5) * 2, // Small random horizontal movement
        y: JUMP_FORCE
      })
      setIsJumping(true)

      // Animate sheep rotation during jump
      controls.start({
        rotate: [0, 360],
        transition: { duration: 0.8 }
      })
    }
  }

  return (
    <div className="fixed inset-0 z-30 pointer-events-none">
      <motion.div
        animate={controls}
        style={{
          position: 'absolute',
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        className="relative pointer-events-auto cursor-pointer"
        onClick={handleJump}
      >
        {/* Sheep body */}
        <div className="relative">
          {/* Shadow */}
          <div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-black/20 rounded-full blur-sm"
            style={{
              transform: `translateX(-50%) scaleX(${1 - (GROUND_LEVEL - position.y) / 100})`
            }}
          />

          {/* Main body */}
          <motion.div
            className="relative"
            animate={{
              scaleY: isJumping ? 1.1 : 1,
              scaleX: isJumping ? 0.9 : 1
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Body */}
            <div className="w-20 h-16 bg-white rounded-full relative shadow-lg border-2 border-gray-300">
              {/* Fluffy texture */}
              <div className="absolute inset-0 flex flex-wrap p-1">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 bg-white rounded-full border border-gray-200 m-0.5"
                  />
                ))}
              </div>
            </div>

            {/* Head */}
            <div className="absolute -top-1 right-0 w-14 h-14 bg-white rounded-full shadow-lg border-2 border-gray-300">
              {/* Eyes */}
              <motion.div
                className="absolute top-4 left-3 w-1.5 h-2 bg-black rounded-full"
                animate={{
                  scaleY: isJumping ? 0.3 : 1
                }}
              />
              <motion.div
                className="absolute top-4 right-3 w-1.5 h-2 bg-black rounded-full"
                animate={{
                  scaleY: isJumping ? 0.3 : 1
                }}
              />

              {/* Nose */}
              <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-2 h-1.5 bg-pink-400 rounded-full" />

              {/* Ears */}
              <div className="absolute -top-1 left-1 w-3 h-4 bg-white rounded-full transform rotate-[-20deg] border border-gray-300" />
              <div className="absolute -top-1 right-1 w-3 h-4 bg-white rounded-full transform rotate-[20deg] border border-gray-300" />
            </div>

            {/* Legs */}
            <motion.div
              animate={{
                rotate: isJumping ? [-10, 10, -10] : 0
              }}
              transition={{
                duration: 0.3,
                repeat: isJumping ? Infinity : 0
              }}
            >
              <div className="absolute bottom-0 left-2 w-2 h-4 bg-gray-800 rounded-full" />
              <div className="absolute bottom-0 left-5 w-2 h-4 bg-gray-800 rounded-full" />
              <div className="absolute bottom-0 right-5 w-2 h-4 bg-gray-800 rounded-full" />
              <div className="absolute bottom-0 right-2 w-2 h-4 bg-gray-800 rounded-full" />
            </motion.div>

            {/* Tail */}
            <motion.div
              className="absolute top-4 -left-2 w-4 h-4 bg-white rounded-full border border-gray-300"
              animate={{
                rotate: isJumping ? [0, 20, -20, 0] : [0, 5, -5, 0]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity
              }}
            />
          </motion.div>

          {/* Jump effect particles */}
          {isJumping && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-0 left-1/2 w-1 h-1 bg-yellow-400 rounded-full"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1
                  }}
                  animate={{
                    x: (i - 1) * 20,
                    y: 20,
                    opacity: 0
                  }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </>
          )}
        </div>
      </motion.div>

      {/* Instructions */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
        <p className="text-sm text-gray-500 bg-white/80 px-4 py-2 rounded-full">
          Click the sheep to make it jump!
        </p>
      </div>
    </div>
  )
}