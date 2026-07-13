import React from 'react'
import { motion } from 'framer-motion'
import type { SensorData } from '@/types'
import { Droplets, Wind, Cloud, Zap, Battery, Wifi, AlertTriangle } from 'lucide-react'

interface SensorCardProps {
  label: string
  value: number
  unit: string
  icon: React.ReactNode
  gradient: string
  status?: 'normal' | 'warning' | 'danger'
  lastUpdated?: Date
}

const SensorCard: React.FC<SensorCardProps> = ({
  label,
  value,
  unit,
  icon,
  gradient,
  status = 'normal',
  lastUpdated,
}) => {
  const statusColors = {
    normal: 'border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-900/10',
    warning: 'border-yellow-500/50 bg-yellow-50/50 dark:bg-yellow-900/10',
    danger: 'border-red-500/50 bg-red-50/50 dark:bg-red-900/10',
  }

  const statusBadges = {
    normal: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
    warning: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300',
    danger: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300',
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`glass rounded-2xl p-6 border ${statusColors[status]} group cursor-pointer`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${gradient} text-white group-hover:shadow-lg transition-shadow`}>
          {icon}
        </div>
        {status !== 'normal' && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusBadges[status]}`}>
            {status.toUpperCase()}
          </span>
        )}
      </div>

      <h3 className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">{label}</h3>
      <div className="flex items-baseline gap-1 mb-3">
        <p className="text-3xl font-bold text-slate-900 dark:text-white">
          {value.toFixed(2)}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{unit}</p>
      </div>

      {lastUpdated && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Updated: {lastUpdated.toLocaleTimeString()}
        </p>
      )}

      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-500" />
      </div>
    </motion.div>
  )
}

export default SensorCard
