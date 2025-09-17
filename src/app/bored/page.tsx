'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import JumpingCat from '@/components/animations/JumpingCat'

export default function BoredPage() {

  const quizzes = [
    { name: 'Sporcle', url: 'https://www.sporcle.com', description: 'Trivia quizzes on thousands of topics' },
    { name: 'JetPunk', url: 'https://www.jetpunk.com', description: 'User-created quizzes and trivia' },
    { name: 'Mental Floss Quizzes', url: 'https://www.mentalfloss.com/quizzes', description: 'Fun and educational quizzes' },
    { name: 'BuzzFeed Quizzes', url: 'https://www.buzzfeed.com/quizzes', description: 'Personality and fun quizzes' },
    { name: 'Kahoot', url: 'https://kahoot.com', description: 'Interactive learning games' },
  ]

  const timepassWebsites = [
    { name: 'Little Alchemy', url: 'https://littlealchemy.com', description: 'Combine elements to discover new items' },
    { name: 'GeoGuessr', url: 'https://www.geoguessr.com', description: 'Guess where in the world you are' },
  ]


  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative">
      {/* Interactive Jumping Cat */}
      <JumpingCat />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center"
      >
        <motion.h1
          className="text-6xl font-bold mb-8"
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
          className="text-xl text-gray-600 mb-12"
        >
          Let's find something fun for you to do! 🐑
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl text-gray-700 mb-12"
        >
          <span className="font-semibold">For today:</span>
          <p className="italic mt-2">If you were a vegetable, you'd be a cute-cumber</p>
          <p className="text-sm text-gray-500 mt-3 font-normal">
            I will update time to time be sure to check please
          </p>
        </motion.div>

        {/* Table of Quizzes and Timepass Websites */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 w-full max-w-6xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Quizzes Column */}
              <div className="border-r border-gray-200">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4">
                  <h2 className="text-2xl font-bold text-center">Quizzes</h2>
                </div>
                <div className="p-4 space-y-3">
                  {quizzes.map((quiz, index) => (
                    <motion.a
                      key={index}
                      href={quiz.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-lg hover:bg-purple-50 transition-colors"
                      whileHover={{ x: 5 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <h3 className="font-semibold text-purple-700">{quiz.name}</h3>
                      <p className="text-sm text-gray-600">{quiz.description}</p>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Timepass Websites Column */}
              <div>
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4">
                  <h2 className="text-2xl font-bold text-center">Timepass Websites</h2>
                </div>
                <div className="p-4 space-y-3">
                  {timepassWebsites.map((site, index) => (
                    <motion.a
                      key={index}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-lg hover:bg-pink-50 transition-colors"
                      whileHover={{ x: 5 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <h3 className="font-semibold text-pink-700">{site.name}</h3>
                      <p className="text-sm text-gray-600">{site.description}</p>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  )
}