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
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
        <div className="flex items-center justify-between px-4 h-16">
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            For you
          </h2>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6 text-neutral-600" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-neutral-600" />
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
              className="fixed right-0 top-16 bottom-0 w-72 bg-white shadow-2xl z-50 md:hidden"
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
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
                        }
                      `}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      <span>{item.name}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-primary-600 rounded-full" />
                      )}
                    </Link>
                  )
                })}
              </nav>

              {/* Cat Instructions for Mobile */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200">
                <div className="mb-4 p-3 bg-orange-100 border border-orange-300 rounded-lg">
                  <p className="text-xs text-orange-800 font-medium text-center">
                    Tap the cat to jump! Hold for higher jumps. Tap on the cat's left/right side to jump in that direction.
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
                    🏠
                  </motion.div>
                  <p className="text-xs text-gray-600 font-bold">Cat&apos;s Home</p>
                  <p className="text-xs text-gray-500 mt-1">Cozy &amp; Warm</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}