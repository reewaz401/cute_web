'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HomeIcon,
  SparklesIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const navigation: NavItem[] = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Bored ?', href: '/bored', icon: SparklesIcon },
]

export default function MobileNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-950 to-black border-b border-orange-600/30 shadow-lg shadow-purple-900/50">
        <div className="flex items-center justify-between px-4 h-16">
          <h2 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
            🎃 Spooky Zone
          </h2>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-purple-900/30 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6 text-orange-400" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-orange-400" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={toggleMenu}
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-16 bottom-0 w-72 bg-gradient-to-b from-purple-950 to-black shadow-2xl shadow-purple-900/50 z-50 md:hidden border-l border-orange-600/30"
            >
              <nav className="p-4 space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={toggleMenu}
                      className={`
                        flex items-center px-4 py-3 text-base font-medium rounded-lg
                        transition-all duration-200 relative
                        ${isActive
                          ? 'text-orange-300 bg-purple-900/50'
                          : 'text-orange-100 hover:text-orange-300 hover:bg-purple-900/30'
                        }
                      `}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      <span>{item.name}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                      )}
                    </Link>
                  )
                })}
              </nav>

              {/* Cat Instructions for Mobile */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-orange-600/30">
                <div className="mb-4 p-3 bg-purple-900/50 border border-orange-500/50 rounded-lg backdrop-blur-sm">
                  <p className="text-xs text-orange-300 font-medium text-center">
                    🧿 Tap the witch cat to cast a jumping spell! Hold for more power!
                  </p>
                </div>

                {/* Cat Home */}
                <div className="relative text-center" id="mobile-cat-home">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-4xl mb-2"
                  >
                    🏚️
                  </motion.div>
                  <p className="text-xs text-orange-400 font-bold">Haunted House</p>
                  <p className="text-xs text-purple-300 mt-1">👻 Spooky &amp; Scary 👻</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}