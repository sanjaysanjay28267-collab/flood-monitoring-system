import express, { Router, Request, Response } from 'express'
const router = Router()

// GET /api/weather/current
router.get('/current', async (req: Request, res: Response) => {
  try {
    const weather = {
      temperature: 28 + Math.random() * 10,
      feelsLike: 32 + Math.random() * 10,
      humidity: 60 + Math.random() * 30,
      pressure: 1013,
      windSpeed: 10 + Math.random() * 20,
      windDirection: Math.floor(Math.random() * 360),
      cloudCover: Math.floor(Math.random() * 100),
      visibility: 10,
      uvIndex: 6,
      precipitationProbability: 60 + Math.random() * 40,
      description: 'Partly cloudy with rain',
      timestamp: new Date(),
    }
    res.json({ success: true, data: weather })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// GET /api/weather/forecast
router.get('/forecast', async (req: Request, res: Response) => {
  try {
    const days = parseInt(req.query.days as string) || 7
    const forecast = Array.from({ length: days }, (_, i) => ({
      temperature: 25 + Math.random() * 10,
      feelsLike: 28 + Math.random() * 10,
      humidity: 60 + Math.random() * 30,
      pressure: 1013,
      windSpeed: 10 + Math.random() * 20,
      precipitationProbability: Math.random() * 100,
      description: Math.random() > 0.5 ? 'Rainy' : 'Sunny',
      timestamp: new Date(Date.now() + i * 86400000),
    }))
    res.json({ success: true, data: forecast })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router
