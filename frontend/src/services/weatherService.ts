import apiClient from './api'

export const weatherService = {
  // Get current weather
  getCurrentWeather: async (lat: number, lon: number) => {
    const response = await apiClient.get('/api/weather/current', {
      params: { lat, lon },
    })
    return response.data
  },

  // Get weather forecast
  getWeatherForecast: async (lat: number, lon: number, days: number = 7) => {
    const response = await apiClient.get('/api/weather/forecast', {
      params: { lat, lon, days },
    })
    return response.data
  },

  // Get weather by location name
  getWeatherByLocation: async (location: string) => {
    const response = await apiClient.get('/api/weather/location', {
      params: { location },
    })
    return response.data
  },
}
