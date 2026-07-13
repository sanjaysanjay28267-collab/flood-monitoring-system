import express, { Router, Request, Response } from 'express'
const router = Router()

// GET /api/stations
router.get('/', async (req: Request, res: Response) => {
  try {
    const stations = [
      {
        _id: '1',
        stationId: 'STATION_001',
        name: 'River Godavari - Nashik',
        location: { lat: 19.997, lon: 73.7997 },
        type: 'river',
        riskLevel: 'warning',
        district: 'Nashik',
        state: 'Maharashtra',
        river: 'Godavari',
        lastUpdated: new Date(),
      },
      {
        _id: '2',
        stationId: 'STATION_002',
        name: 'Dam - Mulshi',
        location: { lat: 18.87, lon: 73.35 },
        type: 'dam',
        riskLevel: 'normal',
        district: 'Pune',
        state: 'Maharashtra',
        capacity: 5.0,
        lastUpdated: new Date(),
      },
      {
        _id: '3',
        stationId: 'STATION_003',
        name: 'River Krishna - Wai',
        location: { lat: 17.96, lon: 73.86 },
        type: 'river',
        riskLevel: 'normal',
        district: 'Satara',
        state: 'Maharashtra',
        lastUpdated: new Date(),
      },
    ]
    res.json({ success: true, data: stations })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// GET /api/stations/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const station = {
      _id: req.params.id,
      stationId: `STATION_${req.params.id}`,
      name: 'River Godavari - Nashik',
      location: { lat: 19.997, lon: 73.7997 },
      type: 'river',
      riskLevel: 'warning',
      district: 'Nashik',
      state: 'Maharashtra',
      lastUpdated: new Date(),
    }
    res.json({ success: true, data: station })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// POST /api/stations
router.post('/', async (req: Request, res: Response) => {
  try {
    const station = { _id: Math.random().toString(36), ...req.body, createdAt: new Date() }
    res.status(201).json({ success: true, data: station, message: 'Station created' })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router
