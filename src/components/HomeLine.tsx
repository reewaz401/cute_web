'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function HomeLine() {
  const [message, setMessage] = useState<string>('I hope you are doing good today :D')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHomeLine = async () => {
      try {
        const response = await fetch('/api/home-line')
        if (response.ok) {
          const data = await response.json()
          setMessage(data.message)
        }
      } catch (error) {
        console.error('Error fetching home line:', error)
        // Keep default message on error
      } finally {
        setIsLoading(false)
      }
    }

    fetchHomeLine()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="text-center py-8"
    >
      <motion.p
        key={message}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-light text-primary-700 dark:text-primary-300 px-4"
        style={{
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          lineHeight: '1.6'
        }}
      >
        {isLoading ? (
          <span className="inline-block animate-pulse">Loading...</span>
        ) : (
          message
        )}
      </motion.p>
    </motion.div>
  )
}