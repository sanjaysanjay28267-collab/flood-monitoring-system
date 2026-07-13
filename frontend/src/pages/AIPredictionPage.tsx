import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedChart from '@/components/AnimatedChart'
import { Brain, TrendingUp, AlertTriangle } from 'lucide-react'

const AIPredictionPage: React.FC = () => {
  const [predictions, setPredictions] = useState({
    floodProbability: 35,
    estimatedOverflowTime: 12,
    riskLevel: 'medium',
    confidence: 92,
    recommendedAction: 'Monitor water levels closely. Issue warning alerts to nearby communities.',
  })

  const inputData = [
    { label: 'Water Level', value: 2.5, unit: 'm' },
    { label: 'Rainfall', value: 45, unit: 'mm' },
    { label: 'Flow Velocity', value: 1.2, unit: 'm/s' },
    { label: 'Humidity', value: 78, unit: '%' },
    { label: 'Temperature', value: 28, unit: '°C' },
  ]

  const probabilityChart = [
    { label: 'Low', value: 20 },
    { label: 'Medium', value: 35 },
    { label: 'High', value: 30 },
    { label: 'Critical', value: 15 },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
          <Brain className="w-10 h-10 text-blue-600" />
          AI Flood Prediction
        </h1>
        <p className="text-slate-600 dark:text-slate-400">Machine learning-powered flood probability forecasting</p>
      </motion.div>

      {/* Main Prediction Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {/* Flood Probability */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400">Flood Probability</h3>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold">
              {predictions.floodProbability}%
            </div>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all"
              style={{ width: `${predictions.floodProbability}%` }}
            />
          </div>
        </div>

        {/* Estimated Overflow Time */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">Est. Overflow Time</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{predictions.estimatedOverflowTime}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">hours from now</p>
        </div>

        {/* Risk Level */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">Risk Level</h3>
          <p className={`text-3xl font-bold capitalize ${
            predictions.riskLevel === 'high' || predictions.riskLevel === 'critical'
              ? 'text-red-600'
              : predictions.riskLevel === 'medium'
              ? 'text-yellow-600'
              : 'text-green-600'
          }`}>
            {predictions.riskLevel}
          </p>
        </div>

        {/* Confidence */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">AI Confidence</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{predictions.confidence}%</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Model accuracy</p>
        </div>
      </motion.div>

      {/* Input Data & Recommended Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
      >
        {/* Input Parameters */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Input Parameters</h3>
          <div className="space-y-4">
            {inputData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {item.value} {item.unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Action */}
        <div className="glass rounded-2xl p-6 border border-yellow-500/30 bg-yellow-50/20 dark:bg-yellow-900/10">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Recommended Action</h3>
              <p className="text-slate-700 dark:text-slate-300">{predictions.recommendedAction}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Probability Distribution */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Probability Distribution</h2>
        <div className="glass rounded-2xl p-6">
          <div className="space-y-4">
            {probabilityChart.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{item.label}</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">{item.value}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AIPredictionPage
