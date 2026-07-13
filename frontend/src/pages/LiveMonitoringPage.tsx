import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SensorCard from '@/components/SensorCard'
import AnimatedChart from '@/components/AnimatedChart'
import AlertCard from '@/components/AlertCard'
import Loading from '@/components/Loading'
import { sensorService } from '@/services/sensorService'
import { alertService } from '@/services/alertService'
import { useDashboardStore } from '@/store/dashboardStore'
import type { SensorData, Alert } from '@/types'
import { Droplets, Wind, Cloud, Zap, Battery, Wifi, TrendingUp, AlertTriangle } from 'lucide-react'

const LiveMonitoringPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [allSensorData, setAllSensorData] = useState<SensorData[]>([])
  const [recentAlerts, setRecentAlerts] = useState<Alert[]>([])
  const { setSensorData, setAlerts } = useDashboardStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sensorData, alerts] = await Promise.all([
          sensorService.getLatestSensorData(100),
          alertService.getRecentAlerts(10),
        ])
        setAllSensorData(sensorData)
        setRecentAlerts(alerts)
        setSensorData(sensorData)
        setAlerts(alerts)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) return <Loading message="Loading live monitoring dashboard..." />

  const latestData = allSensorData[0]
  const avgWaterLevel = allSensorData.reduce((sum, d) => sum + d.waterLevel, 0) / allSensorData.length

  const waterLevelChart = allSensorData.slice(0, 24).map((d, i) => ({
    label: `${i}h`,
    value: d.waterLevel,
  }))

  const temperatureChart = allSensorData.slice(0, 24).map((d, i) => ({
    label: `${i}h`,
    value: d.temperature,
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Live Monitoring Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Real-time data from all monitoring stations</p>
      </motion.div>

      {/* Key Metrics */}
      {latestData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <SensorCard
            label="Water Level"
            value={latestData.waterLevel}
            unit="m"
            icon={<Droplets className="w-6 h-6" />}
            gradient="bg-gradient-to-br from-blue-400 to-blue-600"
            status={latestData.waterLevel > 3 ? 'danger' : latestData.waterLevel > 2 ? 'warning' : 'normal'}
            lastUpdated={new Date(latestData.timestamp)}
          />
          <SensorCard
            label="Flow Velocity"
            value={latestData.flowVelocity}
            unit="m/s"
            icon={<TrendingUp className="w-6 h-6" />}
            gradient="bg-gradient-to-br from-cyan-400 to-cyan-600"
            status={latestData.flowVelocity > 1.5 ? 'warning' : 'normal'}
          />
          <SensorCard
            label="Rainfall"
            value={latestData.rainfall}
            unit="mm"
            icon={<Cloud className="w-6 h-6" />}
            gradient="bg-gradient-to-br from-slate-400 to-slate-600"
          />
          <SensorCard
            label="Temperature"
            value={latestData.temperature}
            unit="°C"
            icon={<Zap className="w-6 h-6" />}
            gradient="bg-gradient-to-br from-orange-400 to-orange-600"
          />
          <SensorCard
            label="Humidity"
            value={latestData.humidity}
            unit="%"
            icon={<Wind className="w-6 h-6" />}
            gradient="bg-gradient-to-br from-green-400 to-green-600"
          />
          <SensorCard
            label="Battery"
            value={latestData.battery}
            unit="%"
            icon={<Battery className="w-6 h-6" />}
            gradient="bg-gradient-to-br from-purple-400 to-purple-600"
            status={latestData.battery < 20 ? 'warning' : 'normal'}
          />
          <SensorCard
            label="System Health"
            value={latestData.systemHealth}
            unit="%"
            icon={<Wifi className="w-6 h-6" />}
            gradient="bg-gradient-to-br from-pink-400 to-pink-600"
          />
          <SensorCard
            label="LoRa Signal"
            value={latestData.loraSignal}
            unit="dBm"
            icon={<AlertTriangle className="w-6 h-6" />}
            gradient="bg-gradient-to-br from-indigo-400 to-indigo-600"
          />
        </motion.div>
      )}

      {/* Charts Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
      >
        <AnimatedChart
          title="Water Level (24h)"
          data={waterLevelChart}
          color="#0ea5e9"
          unit="m"
        />
        <AnimatedChart
          title="Temperature (24h)"
          data={temperatureChart}
          color="#f97316"
          unit="°C"
        />
      </motion.div>

      {/* Alerts Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Recent Alerts</h2>
        <div className="space-y-4">
          {recentAlerts.length > 0 ? (
            recentAlerts.slice(0, 5).map((alert) => (
              <AlertCard key={alert._id} alert={alert} />
            ))
          ) : (
            <div className="glass rounded-xl p-8 text-center">
              <p className="text-slate-600 dark:text-slate-400">No recent alerts</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default LiveMonitoringPage
