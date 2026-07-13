import express, { Router, Request, Response } from 'express'
const router = Router()

// POST /api/sensors - Create sensor data
router.post('/', async (req: Request, res: Response) => {
  try {
    const { stationId, waterLevel, flowVelocity, rainfall, humidity, temperature, battery, solarStatus, gpsCoordinates, timestamp } = req.body
    
    if (!stationId || waterLevel === undefined) {
      return res.status(400).json({ success: false, error: 'Missing required fields' })
    }

    const sensorData = {
      _id: Math.random().toString(36),
      stationId,
      waterLevel,
      flowVelocity,
      rainfall,
      humidity,
      temperature,
      battery,
      solarStatus: solarStatus || 'idle',
      communicationStatus: 'connected',
      loraSignal: -95,
      esp32Status: 'online',
      gpsCoordinates: gpsCoordinates || { lat: 0, lon: 0 },
      systemHealth: 98,
      timestamp: new Date(timestamp || new Date()),
      createdAt: new Date(),
    }

    res.status(201).json({
      success: true,
      data: sensorData,
      message: 'Sensor data created successfully',
    })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// GET /api/sensors - Get all sensor data
router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 1000)
    const page = parseInt(req.query.page as string) || 1

    const sensorData = Array.from({ length: limit }, (_, i) => ({
      _id: Math.random().toString(36),
      stationId: `STATION_${String(i + 1).padStart(3, '0')}`,
      waterLevel: 2.5 + Math.random() * 2,
      flowVelocity: 0.5 + Math.random() * 2,
      rainfall: Math.random() * 10,
      humidity: 50 + Math.random() * 40,
      temperature: 20 + Math.random() * 15,
      battery: 80 + Math.random() * 20,
      solarStatus: Math.random() > 0.5 ? 'charging' : 'discharging',
      communicationStatus: 'connected',
      loraSignal: -120 + Math.random() * 50,
      esp32Status: 'online',
      gpsCoordinates: { lat: 19.997 + Math.random(), lon: 73.7997 + Math.random() },
      systemHealth: 90 + Math.random() * 10,
      timestamp: new Date(Date.now() - i * 60000),
      createdAt: new Date(),
    }))

    res.json({
      success: true,
      data: sensorData,
      pagination: { total: 10000, pages: 200, currentPage: page },
    })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// GET /api/sensors/latest - Get latest sensor data
router.get('/latest', async (req: Request, res: Response) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 1000)
    const data = Array.from({ length: limit }, (_, i) => ({
      _id: Math.random().toString(36),
      stationId: `STATION_${String(i + 1).padStart(3, '0')}`,
      waterLevel: 2.5 + Math.random() * 2,
      flowVelocity: 0.5 + Math.random() * 2,
      rainfall: Math.random() * 10,
      humidity: 50 + Math.random() * 40,
      temperature: 20 + Math.random() * 15,
      battery: 80 + Math.random() * 20,
      solarStatus: 'charging',
      communicationStatus: 'connected',
      loraSignal: -95,
      esp32Status: 'online',
      gpsCoordinates: { lat: 19.997, lon: 73.7997 },
      systemHealth: 98,
      timestamp: new Date(),
    }))
    res.json({ success: true, data })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// GET /api/sensors/station/:stationId - Get data by station
router.get('/station/:stationId', async (req: Request, res: Response) => {
  try {
    const { stationId } = req.params
    const data = {
      _id: Math.random().toString(36),
      stationId,
      waterLevel: 2.5 + Math.random() * 2,
      flowVelocity: 0.5 + Math.random() * 2,
      rainfall: Math.random() * 10,
      humidity: 50 + Math.random() * 40,
      temperature: 20 + Math.random() * 15,
      battery: 80 + Math.random() * 20,
      solarStatus: 'charging',
      communicationStatus: 'connected',
      loraSignal: -95,
      esp32Status: 'online',
      gpsCoordinates: { lat: 19.997, lon: 73.7997 },
      systemHealth: 98,
      timestamp: new Date(),
    }
    res.json({ success: true, data })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router
