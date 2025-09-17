'use client'

import { motion } from 'framer-motion'

export default function ProfilePage() {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          Profile
        </h1>
        <p className="text-neutral-600 mb-8">Manage your account and preferences</p>
      </motion.div>

      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-6"
        >
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-3xl font-bold">
              U
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-1">User Name</h2>
              <p className="text-neutral-600">user@example.com</p>
              <p className="text-sm text-neutral-500 mt-1">Member since January 2024</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  defaultValue="User Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  defaultValue="user@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Location</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h3 className="text-lg font-semibold mb-4">Account Statistics</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
              <p className="text-2xl font-bold text-primary-600">24</p>
              <p className="text-sm text-neutral-600">Projects</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-lg">
              <p className="text-2xl font-bold text-secondary-600">142</p>
              <p className="text-sm text-neutral-600">Animations</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-accent-50 to-accent-100 rounded-lg">
              <p className="text-2xl font-bold text-accent-600">98%</p>
              <p className="text-sm text-neutral-600">Success Rate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}