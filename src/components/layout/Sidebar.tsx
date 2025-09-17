'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  HomeIcon,
  SparklesIcon
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

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="w-64 bg-white shadow-xl border-r border-neutral-200"
    >
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-neutral-200">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
          >
            Curte Studio
          </motion.h2>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  href={item.href}
                  className={`
                    group flex items-center px-4 py-3 text-sm font-medium rounded-lg
                    transition-all duration-200 relative overflow-hidden
                    ${isActive
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-lg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}

                  <Icon className={`
                    mr-3 h-5 w-5 z-10 transition-transform duration-200
                    ${isActive ? '' : 'group-hover:scale-110'}
                  `} />
                  <span className="z-10">{item.name}</span>

                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                      className="ml-auto w-2 h-2 bg-primary-600 rounded-full z-10"
                    />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        <div className="p-4 border-t border-neutral-200">
          {/* Cat Instructions */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-4 p-3 bg-orange-100 border border-orange-300 rounded-lg"
          >
            <p className="text-xs text-orange-800 font-medium text-center">
              Click the cat to jump! Hold for higher jumps. Click on the cat's left/right side to jump in that direction.
            </p>
          </motion.div>

          {/* Cat Home */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="relative text-center"
            id="cat-home"
          >
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
          </motion.div>
        </div>
      </div>
    </motion.aside>
  )
}