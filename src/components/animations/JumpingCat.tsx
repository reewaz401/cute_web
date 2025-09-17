'use client'

import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

export default function JumpingCat() {
  const [position, setPosition] = useState({ x: 50, y: 90 }) // Start at bottom
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const [isJumping, setIsJumping] = useState(false)
  const [isAtHome, setIsAtHome] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const controls = useAnimation()
  const positionRef = useRef({ x: 50, y: 90 })
  const velocityRef = useRef({ x: 0, y: 0 })

  // Physics constants
  const GRAVITY = 0.3
  const JUMP_FORCE = -8
  const GROUND_LEVEL = 90 // percentage from top (moved down so cat can reach bottom)
  const CEILING_LEVEL = 5 // percentage from top
  const DAMPING = 0.5 // Bounce damping factor

  // Update refs when state changes
  useEffect(() => {
    positionRef.current = position
  }, [position])

  useEffect(() => {
    velocityRef.current = velocity
  }, [velocity])

  // Check if cat is at home
  useEffect(() => {
    const checkHome = () => {
      const catHome = document.getElementById('cat-home')
      if (!catHome || isHidden) return

      const catHomeRect = catHome.getBoundingClientRect()
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      // Calculate cat's position in pixels
      const catX = (position.x / 100) * windowWidth
      const catY = (position.y / 100) * windowHeight

      // Check if cat overlaps with cat home (with some tolerance)
      const tolerance = 50 // pixels
      if (catX >= catHomeRect.left - tolerance &&
          catX <= catHomeRect.right + tolerance &&
          catY >= catHomeRect.top - tolerance &&
          catY <= catHomeRect.bottom + tolerance) {
        if (!isAtHome) {
          setIsAtHome(true)
          setShowMessage(true)

          // Hide cat after 1 second
          setTimeout(() => {
            setIsHidden(true)
            setShowMessage(false)
          }, 1000)

          // Bring cat back after 5 seconds
          setTimeout(() => {
            setIsHidden(false)
            setIsAtHome(false)
            // Reset position to center
            setPosition({ x: 50, y: 50 })
            setVelocity({ x: 0, y: 0 })
          }, 5000)
        }
      } else {
        setIsAtHome(false)
      }
    }

    checkHome()
  }, [position, isAtHome, isHidden])

  // Physics update loop
  useEffect(() => {
    const interval = setInterval(() => {
      const currentPos = positionRef.current
      const currentVel = velocityRef.current

      // Calculate new velocity
      let newVelX = currentVel.x * 0.95 // Friction
      let newVelY = currentVel.y + GRAVITY // Gravity

      // Calculate new position
      let newX = currentPos.x + newVelX
      let newY = currentPos.y + newVelY

      // Check ground collision
      if (newY >= GROUND_LEVEL) {
        newY = GROUND_LEVEL
        if (Math.abs(newVelY) > 0.5) {
          newVelY = -newVelY * DAMPING // Bounce
        } else {
          newVelY = 0 // Stop
          newVelX = 0
          setIsJumping(false)
        }
      }

      // Check ceiling collision
      if (newY <= CEILING_LEVEL) {
        newY = CEILING_LEVEL
        newVelY = Math.abs(newVelY) * 0.5
      }

      // Check wall collisions
      if (newX <= 5) {
        newX = 5
        newVelX = Math.abs(newVelX) * 0.5
      }
      if (newX >= 95) {
        newX = 95
        newVelX = -Math.abs(newVelX) * 0.5
      }

      // Update state
      setPosition({ x: newX, y: newY })
      setVelocity({ x: newVelX, y: newVelY })
    }, 30)

    return () => clearInterval(interval)
  }, []) // Empty dependency array - only run once

  const handleJump = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    e.preventDefault()

    // Only jump if on the ground
    if (position.y >= GROUND_LEVEL - 5 && !isJumping) {
      let jumpDirection = 0

      // Determine jump direction based on click/touch position
      if ('clientX' in e) {
        const rect = e.currentTarget.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const catWidth = rect.width
        const relativeX = clickX / catWidth // 0 = far left, 1 = far right

        // Three zones: left (0-0.35), middle (0.35-0.65), right (0.65-1)
        if (relativeX < 0.35) {
          // Clicked on left side - jump right
          jumpDirection = 4
        } else if (relativeX > 0.65) {
          // Clicked on right side - jump left
          jumpDirection = -4
        } else {
          // Clicked in middle - jump straight up with tiny random movement
          jumpDirection = (Math.random() - 0.5) * 0.5
        }
      }

      setVelocity({
        x: jumpDirection,
        y: JUMP_FORCE
      })
      setIsJumping(true)

      // Animate cat rotation during jump
      controls.start({
        rotate: jumpDirection === 0 ? [0, 180, 360] : [0, 360],
        transition: { duration: 0.8 }
      })
    }
  }

  return (
    <div className="fixed inset-0 z-30 pointer-events-none">
      <motion.div
        animate={controls}
        onClick={handleJump}
        onTouchStart={handleJump}
        style={{
          position: 'absolute',
          left: `${position.x}%`,
          top: `${position.y}%`,
          x: '-50%',
          y: '-50%',
          cursor: 'pointer',
          display: isHidden ? 'none' : 'block'
        }}
        className="pointer-events-auto"
      >
        {/* Cat body */}
        <div className="relative">
          {/* Shadow */}
          <div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-14 h-2 bg-black bg-opacity-20 rounded-full blur-sm"
            style={{
              transform: `translateX(-50%) scaleX(${1 - (GROUND_LEVEL - position.y) / 100})`
            }}
          />

          {/* Main body */}
          <motion.div
            className="relative"
            animate={{
              scaleY: isJumping ? 1.2 : 1,
              scaleX: isJumping ? 0.9 : 1
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Body */}
            <div className="w-16 h-12 bg-orange-400 rounded-2xl relative shadow-lg">
              {/* Stripes */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute top-2 w-full h-1.5 bg-orange-600 bg-opacity-50" />
                <div className="absolute top-5 w-full h-1.5 bg-orange-600 bg-opacity-50" />
                <div className="absolute top-8 w-full h-1.5 bg-orange-600 bg-opacity-50" />
              </div>

              {/* Belly */}
              <div className="absolute bottom-0 left-2 right-2 h-6 bg-orange-200 rounded-b-2xl rounded-t-lg" />
            </div>

            {/* Head */}
            <div className="absolute -top-2 right-0 w-14 h-12 bg-orange-400 rounded-2xl shadow-lg">
              {/* Ears */}
              <div className="absolute -top-2 left-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-orange-400" />
              <div className="absolute -top-2 right-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-orange-400" />

              {/* Inner ears */}
              <div className="absolute -top-1 left-2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-pink-300" />
              <div className="absolute -top-1 right-2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-pink-300" />

              {/* Eyes */}
              <motion.div
                className="absolute top-3 left-3 w-2 h-3 bg-black rounded-full"
                animate={{
                  scaleY: isJumping ? 0.3 : 1
                }}
              />
              <motion.div
                className="absolute top-3 right-3 w-2 h-3 bg-black rounded-full"
                animate={{
                  scaleY: isJumping ? 0.3 : 1
                }}
              />

              {/* Nose */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-pink-400" />
              </div>

              {/* Whiskers */}
              <div className="absolute top-5 left-0 w-4 h-0.5 bg-gray-700 -rotate-10" />
              <div className="absolute top-7 left-0 w-4 h-0.5 bg-gray-700 rotate-10" />
              <div className="absolute top-5 right-0 w-4 h-0.5 bg-gray-700 rotate-10" />
              <div className="absolute top-7 right-0 w-4 h-0.5 bg-gray-700 -rotate-10" />

              {/* Mouth */}
              <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-6 h-2">
                <svg viewBox="0 0 24 8" className="w-full h-full">
                  <path d="M 6 0 Q 12 4 18 0" stroke="black" strokeWidth="1" fill="none" />
                </svg>
              </div>
            </div>

            {/* Paws */}
            <motion.div
              animate={{
                rotate: isJumping ? [-10, 10, -10] : 0
              }}
              transition={{
                duration: 0.3,
                repeat: isJumping ? Infinity : 0
              }}
            >
              <div className="absolute bottom-0 left-2 w-3 h-4 bg-orange-400 rounded-full shadow-sm" />
              <div className="absolute bottom-0 left-6 w-3 h-4 bg-orange-400 rounded-full shadow-sm" />
              <div className="absolute bottom-0 right-6 w-3 h-4 bg-orange-400 rounded-full shadow-sm" />
              <div className="absolute bottom-0 right-2 w-3 h-4 bg-orange-400 rounded-full shadow-sm" />

              {/* Paw pads */}
              <div className="absolute bottom-0.5 left-2.5 w-2 h-1 bg-pink-400 rounded-full" />
              <div className="absolute bottom-0.5 left-6.5 w-2 h-1 bg-pink-400 rounded-full" />
              <div className="absolute bottom-0.5 right-6.5 w-2 h-1 bg-pink-400 rounded-full" />
              <div className="absolute bottom-0.5 right-2.5 w-2 h-1 bg-pink-400 rounded-full" />
            </motion.div>

            {/* Tail */}
            <motion.div
              className="absolute top-2 -left-6 w-8 h-3"
              animate={{
                rotate: isJumping ? [0, 30, -30, 0] : [0, 10, -10, 0]
              }}
              transition={{
                duration: 1,
                repeat: Infinity
              }}
              style={{ transformOrigin: 'right center' }}
            >
              <div className="w-full h-full bg-orange-400 rounded-full">
                <div className="absolute top-0.5 w-full h-0.5 bg-orange-600 bg-opacity-50" />
                <div className="absolute bottom-0.5 w-full h-0.5 bg-orange-600 bg-opacity-50" />
              </div>
            </motion.div>
          </motion.div>

          {/* Jump effect particles */}
          {isJumping && (
            <>
              {[0, 1, 2].map((i) => (
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

      {/* Speech bubble when at home */}
      {showMessage && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute z-40 pointer-events-none"
          style={{
            left: `${position.x}%`,
            top: `${position.y - 10}%`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="bg-white px-4 py-2 rounded-lg shadow-lg border-2 border-orange-300 relative">
            <p className="text-sm font-bold text-gray-800 whitespace-nowrap">I am home! Will be back in 5s...</p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white" />
          </div>
        </motion.div>
      )}

      {/* Instructions or waiting message */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
        <p className="text-sm text-gray-500 bg-white bg-opacity-80 px-4 py-2 rounded-full">
          {isHidden
            ? "Cat is resting at home... Coming back soon! 😴"
            : "Click: Left side → jump right | Middle → jump up | Right side → jump left"
          }
        </p>
      </div>
    </div>
  )
}