'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  HomeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { CURRENT_THEME, getThemeConfig } from '@/config/theme'

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const navigation: NavItem[] = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Bored ?', href: '/bored', icon: SparklesIcon },
]

export default function ThemeSidebar() {
  const pathname = usePathname()
  const themeConfig = getThemeConfig()
  const isHalloween = CURRENT_THEME === 'halloween'

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`w-64 shadow-xl ${isHalloween ? 'sidebar-bg' : 'sidebar-bg'}`}
    >
      <div className="h-full flex flex-col">
        <div className={`p-6 relative overflow-hidden ${isHalloween ? 'sidebar-header-border' : 'sidebar-header-border'}`}>
          {/* Halloween decorations */}
          {isHalloween && (
            <>
              <div className="absolute top-0 right-0 text-4xl opacity-30">🕸️</div>
              <motion.div
                className="absolute top-2 left-6 text-xl"
                animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🦇
              </motion.div>
            </>
          )}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-2xl font-bold bg-clip-text text-transparent flex items-center gap-2 ${isHalloween ? 'sidebar-title' : 'sidebar-title'}`}
          >
            {isHalloween && '🎃 '}{themeConfig.siteName}
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
                      ? isHalloween ? 'nav-active' : 'nav-active'
                      : isHalloween ? 'nav-inactive' : 'nav-inactive'
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className={`absolute inset-0 rounded-lg ${isHalloween ? 'nav-active-bg' : 'nav-active-bg'}`}
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
                      className={`ml-auto w-2 h-2 rounded-full z-10 ${isHalloween ? 'nav-active-dot' : 'nav-active-dot'}`}
                    />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        <div className={`p-4 relative ${isHalloween ? 'sidebar-header-border' : 'sidebar-header-border'}`}>
          {/* Halloween spider web decorations */}
          {isHalloween && (
            <>
              <div className="absolute top-0 left-0 text-2xl opacity-20">🕷️</div>
              <div className="absolute bottom-0 right-0 text-2xl opacity-20 rotate-45">🕸️</div>
            </>
          )}

          {/* Cat Instructions */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`mb-4 p-3 rounded-lg ${isHalloween ? 'cat-instructions-bg backdrop-blur-sm' : 'cat-instructions-bg'}`}
          >
            <p className={`text-xs font-medium text-center ${isHalloween ? 'cat-instructions-text' : 'cat-instructions-text'}`}>
              {themeConfig.catInstructions}
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
              animate={isHalloween ? {
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              } : {
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
            <p className={`text-xs font-bold ${isHalloween ? 'text-orange-400' : 'text-gray-600'}`}>
              {themeConfig.catHomeName}
            </p>
            <p className={`text-xs mt-1 ${isHalloween ? 'text-purple-300' : 'text-gray-500'}`}>
              {themeConfig.catHomeDesc}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  )
}