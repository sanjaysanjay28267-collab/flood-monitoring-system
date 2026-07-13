import apiClient from './api'
import type { Station } from '@/types'

export const stationService = {
  // Get all stations
  getAllStations: async () => {
    const response = await apiClient.get('/api/stations')
    return response.data
  },

  // Get station by ID
  getStationById: async (stationId: string) => {
    const response = await apiClient.get(`/api/stations/${stationId}`)
    return response.data
  },

  // Create new station
  createStation: async (data: Omit<Station, '_id'>) => {
    const response = await apiClient.post('/api/stations', data)
    return response.data
  },

  // Update station
  updateStation: async (stationId: string, data: Partial<Station>) => {
    const response = await apiClient.put(`/api/stations/${stationId}`, data)
    return response.data
  },

  // Delete station
  deleteStation: async (stationId: string) => {
    const response = await apiClient.delete(`/api/stations/${stationId}`)
    return response.data
  },

  // Get stations by location
  getStationsByLocation: async (lat: number, lon: number, radius: number = 50) => {
    const response = await apiClient.get('/api/stations/location', {
      params: { lat, lon, radius },
    })
    return response.data
  },

  // Get stations by district
  getStationsByDistrict: async (district: string) => {
    const response = await apiClient.get(`/api/stations/district/${district}`)
    return response.data
  },
}
