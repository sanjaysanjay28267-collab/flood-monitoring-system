export interface SensorData {
  _id?: string
  stationId: string
  waterLevel: number
  flowVelocity: number
  rainfall: number
  humidity: number
  temperature: number
  battery: number
  solarStatus: 'charging' | 'discharging' | 'idle'
  communicationStatus: 'connected' | 'disconnected'
  loraSignal: number
  esp32Status: 'online' | 'offline'
  gpsCoordinates: {
    lat: number
    lon: number
  }
  systemHealth: number
  timestamp: Date
  createdAt?: Date
  updatedAt?: Date
}

export interface Station {
  _id?: string
  stationId: string
  name: string
  location: {
    lat: number
    lon: number
  }
  type: 'river' | 'dam' | 'bridge' | 'city' | 'village'
  riskLevel: 'normal' | 'warning' | 'danger'
  district: string
  state: string
  river?: string
  capacity?: number
  lastUpdated: Date
}

export interface Alert {
  _id?: string
  stationId: string
  alertType: 'critical' | 'warning' | 'normal'
  message: string
  riskLevel: number
  channels: ('sms' | 'email' | 'push' | 'voice')[]
  status: 'sent' | 'pending' | 'failed'
  recipients?: string[]
  createdAt?: Date
  updatedAt?: Date
}

export interface FloodPrediction {
  _id?: string
  stationId: string
  floodProbability: number
  estimatedOverflowTime?: Date
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  confidence: number
  recommendedAction: string
  inputData: {
    waterLevel: number
    rainfall: number
    flowVelocity: number
    humidity: number
    temperature: number
    historicalData: number
    riverCapacity: number
    soilMoisture: number
    weatherForecast: string
  }
  createdAt?: Date
}

export interface WeatherData {
  temperature: number
  feelsLike: number
  humidity: number
  pressure: number
  windSpeed: number
  windDirection: number
  cloudCover: number
  visibility: number
  uvIndex: number
  precipitationProbability: number
  precipitationAmount: number
  description: string
  icon: string
}

export interface WeatherForecast extends WeatherData {
  timestamp: Date
  sunrise?: Date
  sunset?: Date
}

export interface User {
  _id?: string
  email: string
  name: string
  phone?: string
  role: 'admin' | 'officer' | 'user'
  district?: string
  state?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Report {
  _id?: string
  title: string
  type: 'daily' | 'weekly' | 'monthly' | 'yearly'
  startDate: Date
  endDate: Date
  stationIds: string[]
  data: {
    totalAlerts: number
    criticalAlerts: number
    warningAlerts: number
    averageWaterLevel: number
    peakWaterLevel: number
    totalRainfall: number
    floodOccurrences: number
  }
  createdBy: string
  createdAt?: Date
}
