'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import JumpingCat from '@/components/animations/JumpingCat'

export default function BoredPage() {

  // Default fallback websites
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

  // Fetch the latest line of the day and websites
  useEffect(() => {

    const fetchWebsites = async () => {
      try {
        const response = await fetch('/api/timepass-websites')
        if (response.ok) {
          const data = await response.json()
          // Only update if we got data, otherwise keep defaults
          if (data && data.length > 0) {
            setWebsites(data)
          }
        } else {
          // On error, keep the default websites
          console.log('Using default websites due to fetch error')
        }
      } catch (error) {
        console.error('Failed to fetch websites, using defaults:', error)
        // Keep default websites on error
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
            rotate: [0, -5, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Feeling Bored?
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 px-4"
        >
          Let's find something fun for you to do! 🐑
        </motion.p>


        {/* Timepass Websites - Single unified list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 w-full max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
              <h2 className="text-2xl md:text-3xl font-bold text-center">Timepass Websites</h2>
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
                      className="block p-3 md:p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all border border-purple-200"
                      whileHover={{ scale: 1.02, x: 2 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <h3 className="font-bold text-lg text-purple-700 mb-1">{site.name}</h3>
                      {site.description && (
                        <p className="text-sm text-gray-600">{site.description}</p>
                      )}
                    </motion.a>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No websites available yet. Check back later!</p>
              )}
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  )
}