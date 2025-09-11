'use client'

import { AnimatedCard } from '@/components/animations/AnimatedCard'
import { Rotating3DBox } from '@/components/animations/Rotating3DBox'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <motion.header 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 
          className="text-5xl font-bold mb-4"
          style={{ color: 'var(--primary-600)' }}
        >
          Curte Animation Site
        </h1>
        <p 
          className="text-xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          Next.js + TypeScript + Advanced Animations
        </p>
      </motion.header>

      <div className="max-w-7xl mx-auto">
        <section className="mb-16">
          <motion.h2 
            className="text-3xl font-semibold mb-8 text-center"
            style={{ color: 'var(--secondary-600)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Animation Showcase
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatedCard delay={0.1} className="hover:shadow-xl">
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--accent-600)' }}>
                Framer Motion
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Smooth, declarative animations with React components
              </p>
            </AnimatedCard>

            <AnimatedCard delay={0.2} className="hover:shadow-xl">
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--accent-600)' }}>
                GSAP Integration
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Professional-grade animation library for complex sequences
              </p>
            </AnimatedCard>

            <AnimatedCard delay={0.3} className="hover:shadow-xl">
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--accent-600)' }}>
                Lottie Files
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Vector animations exported from After Effects
              </p>
            </AnimatedCard>
          </div>
        </section>

        <section className="mb-16">
          <motion.h2 
            className="text-3xl font-semibold mb-8 text-center"
            style={{ color: 'var(--secondary-600)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            3D Graphics Demo
          </motion.h2>
          
          <div className="rounded-lg overflow-hidden shadow-2xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <Rotating3DBox height="500px" />
          </div>
        </section>

        <motion.section 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--primary-700)' }}>
            Ready to Build Amazing Animations
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            This project is configured with all the tools you need for creating stunning visual experiences
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              className="px-8 py-3 rounded-full font-semibold text-white"
              style={{ backgroundColor: 'var(--primary-600)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            <motion.a
              href="/game"
              className="px-8 py-3 rounded-full font-semibold text-white inline-block"
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎮 Play Color Cascade
            </motion.a>
          </div>
        </motion.section>
      </div>
    </div>
  )
}