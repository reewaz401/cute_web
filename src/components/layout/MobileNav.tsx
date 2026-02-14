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
import { getThemeConfig } from '@/config/theme'

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
  const themeConfig = getThemeConfig()

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-950 to-red-950 border-b border-red-600/30 shadow-lg shadow-green-900/50">
        <div className="flex items-center justify-between px-4 h-16">
          <h2 className="text-xl font-bold bg-gradient-to-r from-red-500 to-green-500 bg-clip-text text-transparent flex items-center gap-2">
            🎄 {themeConfig.siteName}
          </h2>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-green-900/30 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6 text-red-400" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-red-400" />
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
              className="fixed right-0 top-16 bottom-0 w-72 bg-gradient-to-b from-green-950 to-red-950 shadow-2xl shadow-green-900/50 z-50 md:hidden border-l border-red-600/30"
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
                          ? 'text-yellow-200 bg-red-900/50'
                          : 'text-green-100 hover:text-yellow-200 hover:bg-green-900/30'
                        }
                      `}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      <span>{item.name}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                      )}
                    </Link>
                  )
                })}
              </nav>

              {/* Cat Instructions for Mobile */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-red-600/30">
                <div className="mb-4 p-3 bg-green-900/50 border border-red-500/50 rounded-lg backdrop-blur-sm">
                  <p className="text-xs text-green-200 font-medium text-center">
                    {themeConfig.catInstructions}
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
                    {themeConfig.catHome}
                  </motion.div>
                  <p className="text-xs text-red-400 font-bold">{themeConfig.catHomeName}</p>
                  <p className="text-xs text-green-300 mt-1">{themeConfig.catHomeDesc}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
