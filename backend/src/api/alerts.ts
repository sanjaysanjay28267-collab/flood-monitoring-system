import express, { Router, Request, Response } from 'express'
const router = Router()

// GET /api/alerts
router.get('/', async (req: Request, res: Response) => {
  try {
    const alerts = [
      {
        _id: '1',
        stationId: 'STATION_001',
        alertType: 'critical',
        message: 'Water level critical at River Godavari near Nashik',
        riskLevel: 95,
        channels: ['sms', 'email', 'push'],
        status: 'sent',
        createdAt: new Date(),
      },
      {
        _id: '2',
        stationId: 'STATION_002',
        alertType: 'warning',
        message: 'High rainfall detected - flooding risk increases',
        riskLevel: 75,
        channels: ['email', 'push'],
        status: 'sent',
        createdAt: new Date(Date.now() - 600000),
      },
    ]
    res.json({ success: true, data: alerts })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// GET /api/alerts/recent
router.get('/recent', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20
    const alerts = Array.from({ length: Math.min(limit, 20) }, (_, i) => ({
      _id: Math.random().toString(36),
      stationId: `STATION_${String(i + 1).padStart(3, '0')}`,
      alertType: ['critical', 'warning', 'normal'][Math.floor(Math.random() * 3)] as any,
      message: `Alert message ${i + 1}`,
      riskLevel: Math.floor(Math.random() * 100),
      channels: ['sms', 'email', 'push'],
      status: 'sent',
      createdAt: new Date(Date.now() - i * 60000),
    }))
    res.json({ success: true, data: alerts })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// POST /api/alerts
router.post('/', async (req: Request, res: Response) => {
  try {
    const alert = { _id: Math.random().toString(36), ...req.body, status: 'sent', createdAt: new Date() }
    res.status(201).json({ success: true, data: alert, message: 'Alert created and sent' })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router
