'use client'

import { motion } from 'framer-motion'

export default function DashboardPage() {
  const stats = [
    { label: 'Total Views', value: '24.5K', change: '+12.5%', color: 'from-pink-400 to-pink-600' },
    { label: 'Active Users', value: '1,234', change: '+5.2%', color: 'from-green-400 to-green-600' },
    { label: 'Animations', value: '48', change: '+8', color: 'from-purple-400 to-purple-600' },
    { label: 'Performance', value: '98%', change: '+2.1%', color: 'from-orange-400 to-orange-600' },
  ]

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-neutral-600 mb-8">Analytics and performance metrics</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <p className="text-neutral-600 text-sm mb-2">{stat.label}</p>
            <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
            <div className="flex items-center">
              <span className={`text-green-600 text-sm font-semibold`}>{stat.change}</span>
              <span className="text-neutral-400 text-sm ml-2">vs last month</span>
            </div>
            <div className={`h-1 bg-gradient-to-r ${stat.color} rounded-full mt-4`} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-semibold mb-6">Activity Chart</h2>
        <div className="h-64 bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-lg flex items-center justify-center">
          <p className="text-neutral-500">Chart visualization would go here</p>
        </div>
      </motion.div>
    </div>
  )
}