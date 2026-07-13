import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Droplets, Cloud, Wind, Eye, Zap, Navigation } from 'lucide-react'
import SensorCard from '@/components/SensorCard'
import AnimatedChart from '@/components/AnimatedChart'
import Loading from '@/components/Loading'
import { sensorService } from '@/services/sensorService'
import { useDashboardStore } from '@/store/dashboardStore'
import type { SensorData } from '@/types'

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [sensorData, setSensorData] = useState<SensorData | null>(null)
  const { sensorData: allSensorData } = useDashboardStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await sensorService.getLatestSensorData(1)
        if (data && data.length > 0) {
          setSensorData(data[0])
        }
      } catch (error) {
        console.error('Error fetching sensor data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) return <Loading message="Loading dashboard..." />

  const chartData = allSensorData.slice(0, 24).map((data, idx) => ({
    label: `${idx}:00`,
    value: data.waterLevel,
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <div className="relative overflow-hidden rounded-3xl glass p-12 md:p-16">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-300 bg-clip-text text-transparent mb-4"
            >
              AI Smart Flood Monitoring
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl"
            >
              Real-Time Water Level Monitoring using IoT, AI Prediction, Live Maps and Early Alerts
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="/live-monitoring"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:shadow-xl transition-shadow"
              >
                View Live Dashboard
              </a>
              <a
                href="/live-map"
                className="px-8 py-3 rounded-lg bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-white font-semibold hover:bg-white/70 dark:hover:bg-slate-600/70 transition-colors"
              >
                Open Live Map
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Real-time Stats */}
      {sensorData && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Real-Time Monitoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SensorCard
              label="Water Level"
              value={sensorData.waterLevel}
              unit="m"
              icon={<Droplets className="w-6 h-6" />}
              gradient="bg-gradient-to-br from-blue-400 to-blue-600"
              status={sensorData.waterLevel > 3 ? 'danger' : sensorData.waterLevel > 2 ? 'warning' : 'normal'}
            />
            <SensorCard
              label="Flow Velocity"
              value={sensorData.flowVelocity}
              unit="m/s"
              icon={<Navigation className="w-6 h-6" />}
              gradient="bg-gradient-to-br from-cyan-400 to-cyan-600"
              status={sensorData.flowVelocity > 1.5 ? 'warning' : 'normal'}
            />
            <SensorCard
              label="Rainfall"
              value={sensorData.rainfall}
              unit="mm"
              icon={<Cloud className="w-6 h-6" />}
              gradient="bg-gradient-to-br from-slate-400 to-slate-600"
            />
            <SensorCard
              label="Humidity"
              value={sensorData.humidity}
              unit="%"
              icon={<Wind className="w-6 h-6" />}
              gradient="bg-gradient-to-br from-green-400 to-green-600"
            />
          </div>
        </motion.section>
      )}

      {/* Chart Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">24-Hour Water Level Trend</h2>
        <AnimatedChart
          title="Water Level Monitoring"
          data={chartData}
          color="#0ea5e9"
          unit="m"
          height={350}
        />
      </motion.section>

      {/* Features Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Live Monitoring',
              description: 'Real-time sensor data from 100+ stations',
              icon: '📊',
            },
            {
              title: 'AI Predictions',
              description: 'Advanced ML models for flood probability',
              icon: '🤖',
            },
            {
              title: 'Instant Alerts',
              description: 'Multi-channel notifications (SMS, Email, Push)',
              icon: '🚨',
            },
            {
              title: 'Interactive Maps',
              description: 'Google Maps integration with live markers',
              icon: '🗺️',
            },
            {
              title: 'Reports & Analytics',
              description: 'Daily, weekly, monthly reports (PDF/Excel)',
              icon: '📈',
            },
            {
              title: 'Mobile Responsive',
              description: 'Works seamlessly on all devices',
              icon: '📱',
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

export default HomePage
