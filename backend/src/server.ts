import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import 'dotenv/config'
import { Server } from 'socket.io'
import http from 'http'

const app: Express = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
})

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// API Routes
app.get('/api', (req: Request, res: Response) => {
  res.json({
    message: 'Flood Monitoring System API',
    version: '1.0.0',
    endpoints: {
      sensors: '/api/sensors',
      stations: '/api/stations',
      alerts: '/api/alerts',
      predictions: '/api/predictions',
      weather: '/api/weather',
      reports: '/api/reports',
      auth: '/api/auth',
    },
  })
})

// Placeholder routes (to be implemented)
app.get('/api/sensors', (req: Request, res: Response) => {
  res.json([
    {
      _id: '1',
      stationId: 'STATION_001',
      waterLevel: 2.5,
      flowVelocity: 1.2,
      rainfall: 0.8,
      humidity: 75,
      temperature: 28,
      battery: 95,
      solarStatus: 'charging',
      communicationStatus: 'connected',
      loraSignal: -95,
      esp32Status: 'online',
      gpsCoordinates: { lat: 12.9716, lon: 77.5946 },
      systemHealth: 98,
      timestamp: new Date(),
    },
  ])
})

app.get('/api/stations', (req: Request, res: Response) => {
  res.json([
    {
      _id: '1',
      stationId: 'STATION_001',
      name: 'River Godavari - Nashik',
      location: { lat: 19.997, lon: 73.7997 },
      type: 'river',
      riskLevel: 'warning',
      district: 'Nashik',
      state: 'Maharashtra',
      lastUpdated: new Date(),
    },
  ])
})

app.get('/api/alerts', (req: Request, res: Response) => {
  res.json([
    {
      _id: '1',
      stationId: 'STATION_001',
      alertType: 'warning',
      message: 'Water level rising',
      riskLevel: 75,
      channels: ['sms', 'email'],
      status: 'sent',
      createdAt: new Date(),
    },
  ])
})

// Socket.IO events
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('subscribe_sensors', (stationId: string) => {
    socket.join(`station_${stationId}`)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// Error handling
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  })
})

// Start server
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`\n🚀 Flood Monitoring System API`)
  console.log(`📍 Server running on http://localhost:${PORT}`)
  console.log(`🔌 WebSocket enabled via Socket.IO`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV}\n`)
})

export { app, io, server }
