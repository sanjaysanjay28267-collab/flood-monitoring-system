import apiClient from './api'
import type { Alert } from '@/types'

export const alertService = {
  // Get all alerts
  getAllAlerts: async () => {
    const response = await apiClient.get('/api/alerts')
    return response.data
  },

  // Get alerts by station
  getAlertsByStation: async (stationId: string) => {
    const response = await apiClient.get(`/api/alerts/station/${stationId}`)
    return response.data
  },

  // Get alerts by type
  getAlertsByType: async (alertType: 'critical' | 'warning' | 'normal') => {
    const response = await apiClient.get(`/api/alerts/type/${alertType}`)
    return response.data
  },

  // Create alert
  createAlert: async (data: Omit<Alert, '_id'>) => {
    const response = await apiClient.post('/api/alerts', data)
    return response.data
  },

  // Update alert
  updateAlert: async (alertId: string, data: Partial<Alert>) => {
    const response = await apiClient.put(`/api/alerts/${alertId}`, data)
    return response.data
  },

  // Get recent alerts
  getRecentAlerts: async (limit: number = 20) => {
    const response = await apiClient.get(`/api/alerts/recent?limit=${limit}`)
    return response.data
  },
}
