import express, { Express } from 'express'
import sensorsRouter from './sensors'
import stationsRouter from './stations'
import alertsRouter from './alerts'
import predictionsRouter from './predictions'
import weatherRouter from './weather'

export function setupRoutes(app: Express) {
  // API Routes
  app.use('/api/sensors', sensorsRouter)
  app.use('/api/stations', stationsRouter)
  app.use('/api/alerts', alertsRouter)
  app.use('/api/predictions', predictionsRouter)
  app.use('/api/weather', weatherRouter)
}
