import apiClient from './api'
import type { FloodPrediction } from '@/types'

export const predictionService = {
  // Get AI flood prediction
  getFloodPrediction: async (stationId: string) => {
    const response = await apiClient.get(`/api/predictions/${stationId}`)
    return response.data
  },

  // Get predictions for multiple stations
  getMultiplePredictions: async (stationIds: string[]) => {
    const response = await apiClient.post('/api/predictions/batch', { stationIds })
    return response.data
  },

  // Calculate flood prediction
  calculatePrediction: async (data: {
    waterLevel: number
    rainfall: number
    flowVelocity: number
    humidity: number
    temperature: number
    historicalData: number
    riverCapacity: number
    soilMoisture: number
    weatherForecast: string
  }) => {
    const response = await apiClient.post('/api/predictions/calculate', data)
    return response.data
  },

  // Get prediction history
  getPredictionHistory: async (stationId: string, days: number = 7) => {
    const response = await apiClient.get(`/api/predictions/history/${stationId}?days=${days}`)
    return response.data
  },
}
