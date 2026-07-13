import React from 'react'
import { motion } from 'framer-motion'

const SensorDashboardPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Sensor Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage and monitor all IoT sensors</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-12 text-center"
      >
        <p className="text-slate-600 dark:text-slate-400 text-lg">Sensor dashboard coming soon</p>
      </motion.div>
    </div>
  )
}

export default SensorDashboardPage
