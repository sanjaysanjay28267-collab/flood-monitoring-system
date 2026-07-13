import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Loading from '@/components/Loading'
import { stationService } from '@/services/stationService'
import type { Station } from '@/types'
import { MapPin, Droplets, Wind, AlertTriangle } from 'lucide-react'

const LiveMapPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [stations, setStations] = useState<Station[]>([])
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await stationService.getAllStations()
        setStations(data)
      } catch (error) {
        console.error('Error fetching stations:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStations()
  }, [])

  if (isLoading) return <Loading message="Loading map..." />

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'danger':
        return 'bg-red-100 border-red-500 text-red-900'
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-900'
      default:
        return 'bg-green-100 border-green-500 text-green-900'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Live Map</h1>
        <p className="text-slate-600 dark:text-slate-400">Real-time flood monitoring stations across the region</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3"
        >
          <div className="glass rounded-2xl overflow-hidden h-96 md:h-96 lg:h-full min-h-96 relative bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Google Maps integration coming soon
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500">
                {stations.length} stations available
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stations List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Stations</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {stations.slice(0, 10).map((station) => (
              <motion.button
                key={station._id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedStation(station)}
                className={`glass rounded-lg p-3 w-full text-left transition-all border ${
                  selectedStation?._id === station._id
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20'
                    : 'border-white/20 dark:border-slate-700/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                      {station.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {station.district}
                    </p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    station.riskLevel === 'danger'
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                      : station.riskLevel === 'warning'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300'
                      : 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                  }`}>
                    {station.riskLevel.toUpperCase()}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Selected Station Details */}
      {selectedStation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 glass rounded-2xl p-6"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{selectedStation.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Type</p>
              <p className="font-semibold text-slate-900 dark:text-white capitalize">{selectedStation.type}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">District</p>
              <p className="font-semibold text-slate-900 dark:text-white">{selectedStation.district}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">State</p>
              <p className="font-semibold text-slate-900 dark:text-white">{selectedStation.state}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Coordinates</p>
              <p className="font-semibold text-slate-900 dark:text-white text-sm">
                {selectedStation.location.lat.toFixed(4)}, {selectedStation.location.lon.toFixed(4)}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default LiveMapPage
