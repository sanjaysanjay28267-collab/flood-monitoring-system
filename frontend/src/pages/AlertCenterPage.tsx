import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AlertCard from '@/components/AlertCard'
import { AlertTriangle, AlertCircle, Info } from 'lucide-react'

const AlertCenterPage: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'critical' | 'warning' | 'normal'>('all')

  const alerts = [
    {
      _id: '1',
      stationId: 'STATION_001',
      alertType: 'critical' as const,
      message: 'Water level critical at River Godavari near Nashik',
      riskLevel: 95,
      channels: ['sms', 'email', 'push'],
      status: 'sent' as const,
    },
    {
      _id: '2',
      stationId: 'STATION_002',
      alertType: 'warning' as const,
      message: 'High rainfall detected - flooding risk increases',
      riskLevel: 75,
      channels: ['email', 'push'],
      status: 'sent' as const,
    },
    {
      _id: '3',
      stationId: 'STATION_003',
      alertType: 'normal' as const,
      message: 'Water level stable at Dam reservoir',
      riskLevel: 20,
      channels: ['push'],
      status: 'sent' as const,
    },
  ]

  const filteredAlerts = filterType === 'all' ? alerts : alerts.filter(a => a.alertType === filterType)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Alert Center</h1>
        <p className="text-slate-600 dark:text-slate-400">Real-time alerts and notifications</p>
      </motion.div>

      {/* Alert Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div className="glass rounded-2xl p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Critical Alerts</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">3</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
        </div>
        <div className="glass rounded-2xl p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Warning Alerts</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">7</p>
            </div>
            <AlertCircle className="w-10 h-10 text-yellow-600" />
          </div>
        </div>
        <div className="glass rounded-2xl p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Normal Alerts</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">12</p>
            </div>
            <Info className="w-10 h-10 text-blue-600" />
          </div>
        </div>
      </motion.div>

      {/* Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 flex gap-2 flex-wrap"
      >
        {(['all', 'critical', 'warning', 'normal'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              filterType === type
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                : 'glass hover:bg-white/60 dark:hover:bg-slate-700/60'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Alerts List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {filteredAlerts.map((alert, idx) => (
          <motion.div
            key={alert._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <AlertCard alert={alert} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default AlertCenterPage
