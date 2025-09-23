'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function HomeLine() {
  const [showText, setShowText] = useState(true)

  useEffect(() => {
    // Hide text after 4.8 seconds (when congratulations text appears)
    const timer = setTimeout(() => {
      setShowText(false)
    }, 4800)

    return () => clearTimeout(timer)
  }, [])

  if (!showText) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="text-center py-8"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-light text-primary-700 dark:text-primary-300 px-4"
        style={{
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          lineHeight: '1.6'
        }}
      >
        <span className="inline-block animate-pulse">Wait for it...</span>
      </motion.p>
    </motion.div>
  )
}