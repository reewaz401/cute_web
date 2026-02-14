'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import JumpingCat from '@/components/animations/JumpingCat'
import { getThemeConfig } from '@/config/theme'

export default function BoredPage() {
  const themeConfig = getThemeConfig()

  const defaultWebsites = [
    { name: 'JetPunk', url: 'https://www.jetpunk.com', description: 'User-created quizzes and trivia' },
    { name: 'Little Alchemy', url: 'https://littlealchemy.com', description: 'Combine elements to discover new items' },
    { name: 'GeoGuessr', url: 'https://www.geoguessr.com', description: 'Guess where in the world you are' },
    { name: 'Quick, Draw!', url: 'https://quickdraw.withgoogle.com', description: 'Can a neural network learn to recognize doodling?' },
    { name: 'Window Swap', url: 'https://www.window-swap.com', description: "See the view from someone else's window" }
  ]

  const [websites, setWebsites] = useState<Array<{
    name: string
    url: string
    description: string | null
  }>>(defaultWebsites)

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await fetch('/api/timepass-websites')
        if (response.ok) {
          const data = await response.json()
          if (data && data.length > 0) {
            setWebsites(data)
          }
        } else {
          console.log('Using default websites due to fetch error')
        }
      } catch (error) {
        console.error('Failed to fetch websites, using defaults:', error)
      }
    }

    fetchWebsites()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative">
      {/* Interactive Jumping Cat */}
      <JumpingCat />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 md:mb-8"
          animate={{
            rotate: [0, -3, 3, -3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 bg-clip-text text-transparent">
            {themeConfig.boredTitle}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-green-200 mb-8 md:mb-12 px-4"
        >
          {themeConfig.boredSubtitle}
        </motion.p>

        {/* Websites list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 w-full max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-b from-green-950/90 to-red-950/90 rounded-2xl shadow-xl shadow-green-900/50 overflow-hidden border border-red-600/30 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-red-600 to-green-700 text-white p-6">
              <h2 className="text-2xl md:text-3xl font-bold text-center">{themeConfig.websitesTitle}</h2>
            </div>
            <div className="p-4 md:p-6">
              {websites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {websites.map((site, index) => (
                    <motion.a
                      key={index}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 md:p-4 rounded-lg bg-gradient-to-r from-red-900/30 to-green-900/30 hover:from-red-800/40 hover:to-green-800/40 transition-all border border-red-500/30 backdrop-blur-sm"
                      whileHover={{ scale: 1.02, x: 2 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <h3 className="font-bold text-lg text-yellow-300 mb-1">{site.name}</h3>
                      {site.description && (
                        <p className="text-sm text-green-200/70">{site.description}</p>
                      )}
                    </motion.a>
                  ))}
                </div>
              ) : (
                <p className="text-center text-green-300/70 py-8">No holiday websites available yet. Check back later! 🎄</p>
              )}
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  )
}
