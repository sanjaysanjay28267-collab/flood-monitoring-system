import apiClient from './api'
import type { SensorData } from '@/types'

export const sensorService = {
  // Get all sensor data
  getAllSensorData: async () => {
    const response = await apiClient.get('/api/sensors')
    return response.data
  },

  // Get sensor data by station ID
  getSensorDataByStation: async (stationId: string) => {
    const response = await apiClient.get(`/api/sensors/station/${stationId}`)
    return response.data
  },

  // Create new sensor data
  createSensorData: async (data: Omit<SensorData, '_id'>) => {
    const response = await apiClient.post('/api/sensors', data)
    return response.data
  },

  // Get latest sensor data
  getLatestSensorData: async (limit: number = 50) => {
    const response = await apiClient.get(`/api/sensors/latest?limit=${limit}`)
    return response.data
  },

  // Get historical sensor data
  getHistoricalData: async (stationId: string, startDate: Date, endDate: Date) => {
    const response = await apiClient.get(`/api/sensors/history/${stationId}`, {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    })
    return response.data
  },
}
