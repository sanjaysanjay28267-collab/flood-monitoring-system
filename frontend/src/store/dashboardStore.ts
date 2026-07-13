import { create } from 'zustand'
import type { SensorData, Station, Alert } from '@/types'

interface DashboardStore {
  sensorData: SensorData[]
  stations: Station[]
  alerts: Alert[]
  selectedStation: Station | null
  setSensorData: (data: SensorData[]) => void
  setStations: (stations: Station[]) => void
  setAlerts: (alerts: Alert[]) => void
  setSelectedStation: (station: Station | null) => void
  addSensorData: (data: SensorData) => void
  addAlert: (alert: Alert) => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  sensorData: [],
  stations: [],
  alerts: [],
  selectedStation: null,
  setSensorData: (data) => set({ sensorData: data }),
  setStations: (stations) => set({ stations }),
  setAlerts: (alerts) => set({ alerts }),
  setSelectedStation: (station) => set({ selectedStation: station }),
  addSensorData: (data) =>
    set((state) => ({
      sensorData: [data, ...state.sensorData.slice(0, 99)],
    })),
  addAlert: (alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts.slice(0, 49)],
    })),
}))
