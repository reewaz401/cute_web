'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function HomeLine() {
  const [showText] = useState(true)
  const [lineText, setLineText] = useState('Cooking...')

  useEffect(() => {
    // Show "Cooking..." for 4 seconds, then fetch line of the day
    const timer = setTimeout(() => {
      const fetchLineOfDay = async () => {
        try {
          const response = await fetch('/api/home-line')
          if (response.ok) {
            const data = await response.json()
            if (data.message) {
              setLineText(data.message)
            }
          }
        } catch (error) {
          console.error('Error fetching line:', error)
        }
      }

      fetchLineOfDay()
    }, 4000) // 4 second delay

    return () => clearTimeout(timer)

    // Don't auto-hide anymore - let it stay visible
    // const timer = setTimeout(() => {
    //   setShowText(false)
    // }, 4800)

    // return () => clearTimeout(timer)
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
        className="text-2xl md:text-3xl font-light text-orange-400 px-4"
        style={{
          textShadow: '0 2px 8px rgba(255,106,0,0.5)',
          lineHeight: '1.6'
        }}
      >
        <span className="inline-block">{lineText}</span>
      </motion.p>
    </motion.div>
  )
}