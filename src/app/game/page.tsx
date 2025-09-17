'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FallingBall {
  id: number
  x: number
  y: number
  color: string
  speed: number
}

const COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#a855f7']
const PADDLE_WIDTH = 120
const BALL_SIZE = 40

export default function ColorCascadeGame() {
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [level, setLevel] = useState(1)
  const [paddleColor, setPaddleColor] = useState(COLORS[0])
  const [paddleX, setPaddleX] = useState(50)
  const [balls, setBalls] = useState<FallingBall[]>([])
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu')
  const [highScore, setHighScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([])
  
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const ballIdRef = useRef(0)
  const lastSpawnRef = useRef(0)
  const keysPressed = useRef<Set<string>>(new Set())

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('colorCascadeHighScore')
    if (saved) setHighScore(parseInt(saved))
  }, [])

  // Spawn balls
  const spawnBall = useCallback(() => {
    const now = Date.now()
    const spawnDelay = Math.max(1000 - level * 50, 300)
    
    if (now - lastSpawnRef.current > spawnDelay) {
      const newBall: FallingBall = {
        id: ballIdRef.current++,
        x: Math.random() * (window.innerWidth - BALL_SIZE),
        y: -BALL_SIZE,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        speed: 2 + level * 0.5
      }
      setBalls(prev => [...prev, newBall])
      lastSpawnRef.current = now
    }
  }, [level])

  // Update paddle position based on keyboard input
  const updatePaddlePosition = useCallback(() => {
    const speed = 1.2 // Slower, more controlled movement
    
    if (keysPressed.current.has('ArrowLeft')) {
      setPaddleX(prev => Math.max(10, prev - speed))
    } else if (keysPressed.current.has('ArrowRight')) {
      setPaddleX(prev => Math.min(90, prev + speed))
    }
  }, [])

  // Game loop
  const gameLoop = useCallback(() => {
    if (gameState !== 'playing') return

    spawnBall()
    updatePaddlePosition()

    setBalls(prevBalls => {
      const updatedBalls = prevBalls.map(ball => ({
        ...ball,
        y: ball.y + ball.speed
      }))

      // Check collisions with paddle
      const paddleY = window.innerHeight - 100
      const remainingBalls: FallingBall[] = []
      
      updatedBalls.forEach(ball => {
        if (ball.y + BALL_SIZE >= paddleY && ball.y <= paddleY + 20) {
          const paddleLeft = (paddleX / 100) * window.innerWidth - PADDLE_WIDTH / 2
          const paddleRight = paddleLeft + PADDLE_WIDTH
          
          if (ball.x + BALL_SIZE > paddleLeft && ball.x < paddleRight) {
            if (ball.color === paddleColor) {
              // Correct catch
              setScore(prev => prev + (10 * (combo + 1)))
              setCombo(prev => prev + 1)
              
              // Create particle effect
              setParticles(prev => [...prev, {
                id: Date.now() + Math.random(),
                x: ball.x + BALL_SIZE / 2,
                y: paddleY
              }])
              
              // Level up every 100 points
              if ((score + 10) % 100 === 0) {
                setLevel(prev => prev + 1)
              }
            } else {
              // Wrong color
              setLives(prev => prev - 1)
              setCombo(0)
            }
            return // Don't add to remaining balls
          }
        }
        
        // Check if ball fell off screen
        if (ball.y > window.innerHeight) {
          if (ball.color === paddleColor) {
            setLives(prev => prev - 1)
            setCombo(0)
          }
          return // Don't add to remaining balls
        }
        
        remainingBalls.push(ball)
      })

      return remainingBalls
    })

    // Check game over
    if (lives <= 0) {
      setGameState('gameover')
      if (score > highScore) {
        setHighScore(score)
        localStorage.setItem('colorCascadeHighScore', score.toString())
      }
    }

    animationRef.current = requestAnimationFrame(gameLoop)
  }, [gameState, paddleX, paddleColor, score, lives, combo, highScore, spawnBall, updatePaddlePosition])

  // Start/restart game
  const startGame = () => {
    setScore(0)
    setLives(3)
    setLevel(1)
    setCombo(0)
    setBalls([])
    setParticles([])
    setPaddleColor(COLORS[0])
    setGameState('playing')
    lastSpawnRef.current = Date.now()
  }

  // Handle all keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Arrow keys for movement (only during gameplay)
      if (gameState === 'playing' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault()
        keysPressed.current.add(e.key)
      }
      
      // Color switching (only during gameplay)
      if (gameState === 'playing') {
        const key = e.key.toLowerCase()
        if (key >= '1' && key <= '5') {
          setPaddleColor(COLORS[parseInt(key) - 1])
        } else if (key === ' ') {
          e.preventDefault()
          const currentIndex = COLORS.indexOf(paddleColor)
          setPaddleColor(COLORS[(currentIndex + 1) % COLORS.length])
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        keysPressed.current.delete(e.key)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      keysPressed.current.clear()
    }
  }, [gameState, paddleColor])

  // Run game loop
  useEffect(() => {
    if (gameState === 'playing') {
      animationRef.current = requestAnimationFrame(gameLoop)
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameLoop, gameState])

  // Clean up particles
  useEffect(() => {
    const timer = setInterval(() => {
      setParticles(prev => prev.filter(p => Date.now() - p.id < 1000))
    }, 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <div 
      ref={gameAreaRef}
      className="fixed inset-0 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #1e293b, #0f172a)' }}
    >
      {/* Game UI */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
        <div className="text-white">
          <div className="text-2xl font-bold">Score: {score}</div>
          <div className="text-lg">Level: {level}</div>
          {combo > 1 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-yellow-400 font-bold"
            >
              Combo x{combo}!
            </motion.div>
          )}
        </div>
        
        <div className="text-white text-right">
          <div className="text-lg">High Score: {highScore}</div>
          <div className="flex gap-1 justify-end mt-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 1 }}
                animate={{ scale: i < lives ? 1 : 0 }}
                className="w-8 h-8 bg-red-500 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Menu */}
      <AnimatePresence>
        {gameState === 'menu' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-30 bg-black/50"
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-lg p-8 text-center max-w-md"
            >
              <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--primary-600)' }}>
                Color Cascade
              </h1>
              <p className="mb-6 text-gray-600">
                Catch falling balls with the matching color paddle!
              </p>
              <div className="text-left mb-6 text-sm text-gray-500">
                <p className="mb-2">⬅️➡️ Arrow keys to move paddle</p>
                <p className="mb-2">🔴 Press 1-5 or SPACE to change colors</p>
                <p className="mb-2">✅ Match colors to score points</p>
                <p>❌ Wrong color or miss = lose a life</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-lg"
              >
                Start Game
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over */}
      <AnimatePresence>
        {gameState === 'gameover' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-30 bg-black/50"
          >
            <motion.div 
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="bg-white rounded-lg p-8 text-center"
            >
              <h2 className="text-3xl font-bold mb-4 text-red-500">Game Over!</h2>
              <p className="text-2xl mb-2">Final Score: {score}</p>
              {score === highScore && score > 0 && (
                <motion.p 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-xl text-green-500 font-bold mb-4"
                >
                  New High Score! 🎉
                </motion.p>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-pink-500 text-white rounded-full font-bold text-lg"
              >
                Play Again
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Falling Balls */}
      {gameState === 'playing' && balls.map(ball => (
        <motion.div
          key={ball.id}
          className="absolute rounded-full shadow-lg"
          style={{
            left: ball.x,
            top: ball.y,
            width: BALL_SIZE,
            height: BALL_SIZE,
            backgroundColor: ball.color,
            boxShadow: `0 0 20px ${ball.color}50`
          }}
        />
      ))}

      {/* Particles */}
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ scale: 0, y: 0 }}
            animate={{ 
              scale: [1, 1.5, 0],
              y: -50,
              x: (Math.random() - 0.5) * 100
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-4 h-4 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: paddleColor,
              pointerEvents: 'none'
            }}
          />
        ))}
      </AnimatePresence>

      {/* Paddle */}
      {gameState === 'playing' && (
        <div
          className="absolute rounded-full shadow-2xl transition-none"
          style={{
            left: `${paddleX}%`,
            bottom: 60,
            width: PADDLE_WIDTH,
            height: 20,
            transform: 'translateX(-50%)',
            backgroundColor: paddleColor,
            boxShadow: `0 10px 30px ${paddleColor}80`
          }}
        />
      )}

      {/* Color Selector */}
      {gameState === 'playing' && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {COLORS.map((color, index) => (
            <motion.button
              key={color}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPaddleColor(color)}
              className="w-10 h-10 rounded-full border-4"
              style={{
                backgroundColor: color,
                borderColor: paddleColor === color ? 'white' : 'transparent'
              }}
            >
              <span className="text-white text-xs font-bold">{index + 1}</span>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}