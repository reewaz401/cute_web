'use client'

import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

export default function JumpingCat() {
  const [position, setPosition] = useState({ x: 50, y: 90 })
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const [isJumping, setIsJumping] = useState(false)
  const [isAtHome, setIsAtHome] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isCharging, setIsCharging] = useState(false)
  const [chargeLevel, setChargeLevel] = useState(0)
  const [enjoyMessage, setEnjoyMessage] = useState('')
  const controls = useAnimation()
  const positionRef = useRef({ x: 50, y: 90 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const pressStartTime = useRef<number | null>(null)
  const chargeInterval = useRef<NodeJS.Timeout | null>(null)

  // Physics constants
  const GRAVITY = 0.3
  const MIN_JUMP_FORCE = -5
  const MAX_JUMP_FORCE = -12
  const CHARGE_TIME = 1000
  const GROUND_LEVEL = 90
  const CEILING_LEVEL = 5
  const DAMPING = 0.5

  useEffect(() => {
    positionRef.current = position
  }, [position])

  useEffect(() => {
    velocityRef.current = velocity
  }, [velocity])

  // Check if cat is at home
  useEffect(() => {
    const checkHome = () => {
      const catHome = document.getElementById('cat-home') || document.getElementById('mobile-cat-home')
      if (!catHome || isHidden) return

      const catHomeRect = catHome.getBoundingClientRect()
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      const catX = (position.x / 100) * windowWidth
      const catY = (position.y / 100) * windowHeight

      const tolerance = 5
      if (catX >= catHomeRect.left - tolerance &&
          catX <= catHomeRect.right + tolerance &&
          catY >= catHomeRect.top - tolerance &&
          catY <= catHomeRect.bottom + tolerance) {
        if (!isAtHome) {
          setIsAtHome(true)
          setShowMessage(true)

          setTimeout(() => {
            setIsHidden(true)
            setShowMessage(false)
          }, 1000)

          setTimeout(() => {
            setIsHidden(false)
            setIsAtHome(false)
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

  // Random festive messages
  useEffect(() => {
    const messages = ['Merry Christmas! 🎄', 'Ho Ho Ho! 🎅', 'Happy New Year! 🎆', 'Jingle Bells! 🔔']

    const showRandomMessage = () => {
      if (!isHidden && !isAtHome) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)]
        setEnjoyMessage(randomMessage)

        setTimeout(() => {
          setEnjoyMessage('')
        }, 2000)
      }
    }

    const interval = setInterval(() => {
      showRandomMessage()
    }, 8000 + Math.random() * 4000)

    const initialTimeout = setTimeout(() => {
      showRandomMessage()
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(initialTimeout)
    }
  }, [isHidden, isAtHome])

  // Physics update loop
  useEffect(() => {
    const interval = setInterval(() => {
      const currentPos = positionRef.current
      const currentVel = velocityRef.current

      let newVelX = currentVel.x * 0.95
      let newVelY = currentVel.y + GRAVITY

      let newX = currentPos.x + newVelX
      let newY = currentPos.y + newVelY

      if (newY >= GROUND_LEVEL) {
        newY = GROUND_LEVEL
        if (Math.abs(newVelY) > 0.5) {
          newVelY = -newVelY * DAMPING
        } else {
          newVelY = 0
          newVelX = 0
          setIsJumping(false)
        }
      }

      if (newY <= CEILING_LEVEL) {
        newY = CEILING_LEVEL
        newVelY = Math.abs(newVelY) * 0.5
      }

      if (newX <= 5) {
        newX = 5
        newVelX = Math.abs(newVelX) * 0.5
      }
      if (newX >= 95) {
        newX = 95
        newVelX = -Math.abs(newVelX) * 0.5
      }

      setPosition({ x: newX, y: newY })
      setVelocity({ x: newVelX, y: newVelY })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  const handlePressStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    e.preventDefault()

    if (position.y >= GROUND_LEVEL - 5 && !isJumping) {
      pressStartTime.current = Date.now()
      setIsCharging(true)
      setChargeLevel(0)

      chargeInterval.current = setInterval(() => {
        const elapsed = Date.now() - (pressStartTime.current || Date.now())
        const charge = Math.min(elapsed / CHARGE_TIME, 1)
        setChargeLevel(charge)
      }, 30)
    }
  }

  const handlePressEnd = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    e.preventDefault()

    if (chargeInterval.current) {
      clearInterval(chargeInterval.current)
      chargeInterval.current = null
    }

    if (position.y >= GROUND_LEVEL - 5 && !isJumping && pressStartTime.current) {
      const pressDuration = Date.now() - pressStartTime.current
      const chargePercent = Math.min(pressDuration / CHARGE_TIME, 1)

      const jumpForce = MIN_JUMP_FORCE + (MAX_JUMP_FORCE - MIN_JUMP_FORCE) * chargePercent

      let jumpDirection = 0

      if ('clientX' in e) {
        const rect = e.currentTarget.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const catWidth = rect.width
        const relativeX = clickX / catWidth

        if (relativeX < 0.35) {
          jumpDirection = 1.5 + chargePercent * 2.5
        } else if (relativeX > 0.65) {
          jumpDirection = -(1.5 + chargePercent * 2.5)
        } else {
          jumpDirection = (Math.random() - 0.5) * 0.5
        }
      }

      setVelocity({
        x: jumpDirection,
        y: jumpForce
      })
      setIsJumping(true)
      setIsCharging(false)
      setChargeLevel(0)
      pressStartTime.current = null

      const rotations = chargePercent > 0.5 ? [0, 360, 720] : [0, 360]
      controls.start({
        rotate: rotations,
        transition: { duration: 0.8 + chargePercent * 0.4 }
      })
    }
  }

  return (
    <div className="fixed inset-0 z-30 pointer-events-none">
      <motion.div
        animate={controls}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
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
            {/* Body with Christmas costume */}
            <div className="w-16 h-12 bg-red-700 rounded-2xl relative shadow-lg">
              {/* White fur trim stripes */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute top-2 w-full h-1.5 bg-white opacity-80" />
                <div className="absolute top-5 w-full h-1.5 bg-white opacity-80" />
                <div className="absolute top-8 w-full h-1.5 bg-white opacity-80" />
              </div>

              {/* White belly */}
              <div className="absolute bottom-0 left-2 right-2 h-6 bg-white rounded-b-2xl rounded-t-lg" />
            </div>

            {/* Head with Santa hat */}
            <div className="absolute -top-2 right-0 w-14 h-12 bg-gray-700 rounded-2xl shadow-lg">
              {/* Santa hat */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
                {/* Hat cone */}
                <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[25px] border-b-red-600" />
                {/* Hat brim (white fur) */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-white rounded-full" />
                {/* Pompom */}
                <motion.div
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
              {/* Cat ears peeking through */}
              <div className="absolute -top-2 left-0 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-gray-700" />
              <div className="absolute -top-2 right-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-gray-700" />

              {/* Inner ears */}
              <div className="absolute -top-1 left-2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-pink-300" />
              <div className="absolute -top-1 right-2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-pink-300" />

              {/* Bright festive eyes */}
              <motion.div
                className="absolute top-3 left-3 w-2 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
                animate={{
                  scaleY: isJumping ? 0.3 : 1
                }}
              />
              <motion.div
                className="absolute top-3 right-3 w-2 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
                animate={{
                  scaleY: isJumping ? 0.3 : 1
                }}
              />

              {/* Nose */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-red-400" />
              </div>

              {/* Whiskers */}
              <div className="absolute top-5 left-0 w-4 h-0.5 bg-gray-400 -rotate-10" />
              <div className="absolute top-7 left-0 w-4 h-0.5 bg-gray-400 rotate-10" />
              <div className="absolute top-5 right-0 w-4 h-0.5 bg-gray-400 rotate-10" />
              <div className="absolute top-7 right-0 w-4 h-0.5 bg-gray-400 -rotate-10" />

              {/* Mouth */}
              <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-6 h-2">
                <svg viewBox="0 0 24 8" className="w-full h-full">
                  <path d="M 6 0 Q 12 4 18 0" stroke="black" strokeWidth="1" fill="none" />
                </svg>
              </div>
            </div>

            {/* Paws with red pads */}
            <motion.div
              animate={{
                rotate: isJumping ? [-10, 10, -10] : 0
              }}
              transition={{
                duration: 0.3,
                repeat: isJumping ? Infinity : 0
              }}
            >
              <div className="absolute bottom-0 left-2 w-3 h-4 bg-gray-700 rounded-full shadow-sm" />
              <div className="absolute bottom-0 left-6 w-3 h-4 bg-gray-700 rounded-full shadow-sm" />
              <div className="absolute bottom-0 right-6 w-3 h-4 bg-gray-700 rounded-full shadow-sm" />
              <div className="absolute bottom-0 right-2 w-3 h-4 bg-gray-700 rounded-full shadow-sm" />

              {/* Red paw pads */}
              <div className="absolute bottom-0.5 left-2.5 w-2 h-1 bg-red-400 rounded-full" />
              <div className="absolute bottom-0.5 left-6.5 w-2 h-1 bg-red-400 rounded-full" />
              <div className="absolute bottom-0.5 right-6.5 w-2 h-1 bg-red-400 rounded-full" />
              <div className="absolute bottom-0.5 right-2.5 w-2 h-1 bg-red-400 rounded-full" />
            </motion.div>

            {/* Tail with red/green stripes */}
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
              <div className="w-full h-full bg-gray-700 rounded-full">
                <div className="absolute top-0.5 w-full h-0.5 bg-red-500" />
                <div className="absolute bottom-0.5 w-full h-0.5 bg-green-500" />
              </div>
            </motion.div>

            {/* Tiny scarf */}
            <div className="absolute top-10 right-2 w-10 h-2 bg-red-500 rounded-full z-20" />
            <div className="absolute top-11 right-0 w-3 h-4 bg-red-500 rounded-b-lg z-20">
              <div className="absolute bottom-0 w-full h-1 bg-green-500" />
            </div>
          </motion.div>

          {/* Charge indicator */}
          {isCharging && chargeLevel > 0 && (
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-20 h-2 bg-gray-300 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 to-red-500"
                  style={{
                    width: `${chargeLevel * 100}%`,
                  }}
                />
              </div>
              {chargeLevel > 0.5 && (
                <motion.div
                  className="absolute inset-0 flex justify-center items-center"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity
                  }}
                >
                  <div className="text-xs">⭐</div>
                </motion.div>
              )}
            </motion.div>
          )}

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
          <div className="bg-red-800 px-4 py-2 rounded-lg shadow-lg border-2 border-green-500 relative">
            <p className="text-sm font-bold text-yellow-200 whitespace-nowrap">Back to Santa&apos;s cabin! 🏠</p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-red-800" />
          </div>
        </motion.div>
      )}

      {/* Random enjoy message */}
      {enjoyMessage && !isHidden && !isAtHome && (
        <motion.div
          key={enjoyMessage}
          initial={{ scale: 0, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute z-40 pointer-events-none"
          style={{
            left: `${position.x}%`,
            top: `${position.y - 15}%`,
            transform: 'translateX(-50%)'
          }}
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="bg-gradient-to-r from-red-200 to-green-200 px-3 py-1.5 rounded-full shadow-lg border-2 border-red-400 relative"
          >
            <p className="text-sm font-bold text-red-700 whitespace-nowrap">
              {enjoyMessage}
            </p>
            <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-green-100" />
          </motion.div>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center pointer-events-none px-4 w-full max-w-sm">
        <p className="text-xs md:text-sm text-gray-500 bg-white bg-opacity-80 px-3 md:px-4 py-1.5 md:py-2 rounded-full">
          {isHidden
            ? "Cat is resting at the cabin... Coming back soon! 😴"
            : "Hold to charge jump! Tap left/right for direction"
          }
        </p>
      </div>
    </div>
  )
}
