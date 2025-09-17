'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingChatBot() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center text-white z-50 hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>

      {/* Notification Badge */}
      {!isOpen && (
        <motion.div
          className="fixed bottom-16 right-5 w-3 h-3 bg-red-500 rounded-full z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, type: "spring" }}
        >
          <div className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute"></div>
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-sm">Joke Box</span>
                </div>
                <span className="text-xs opacity-75">Online</span>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-3">
                {/* Bot Message */}
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">
                    😄
                  </div>
                  <div className="bg-white px-3 py-2 rounded-lg rounded-tl-none shadow-sm max-w-[70%]">
                    <p className="text-sm text-gray-700">Hey! Ready for some jokes?</p>
                  </div>
                </div>

                {/* Coming Soon Message */}
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🚧</div>
                    <h4 className="font-bold text-gray-800 mb-1">Jokes Coming Soon!</h4>
                    <p className="text-xs text-gray-500">
                      Get ready to laugh! Joke feature in development
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  disabled
                  className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-400 rounded-full cursor-not-allowed"
                />
                <button
                  disabled
                  className="p-2 bg-gray-200 text-gray-400 rounded-full cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}