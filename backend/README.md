# Backend API Documentation

## Endpoints

### Sensors
- `GET /api/sensors` - Get all sensor data
- `GET /api/sensors/station/:stationId` - Get data by station
- `GET /api/sensors/latest` - Get latest readings
- `POST /api/sensors` - Create sensor data
- `GET /api/sensors/history/:stationId` - Historical data

### Stations
- `GET /api/stations` - Get all stations
- `GET /api/stations/:id` - Get station by ID
- `GET /api/stations/district/:district` - Stations by district
- `POST /api/stations` - Create station
- `PUT /api/stations/:id` - Update station

### Alerts
- `GET /api/alerts` - Get all alerts
- `GET /api/alerts/station/:stationId` - Alerts by station
- `GET /api/alerts/type/:type` - Alerts by type
- `POST /api/alerts` - Create alert
- `GET /api/alerts/recent` - Recent alerts

### Predictions
- `GET /api/predictions/:stationId` - Get prediction
- `POST /api/predictions/calculate` - Calculate prediction
- `GET /api/predictions/history/:stationId` - Prediction history

### Weather
- `GET /api/weather/current` - Current weather
- `GET /api/weather/forecast` - Weather forecast

### Reports
- `GET /api/reports` - Get all reports
- `POST /api/reports/generate` - Generate report
- `GET /api/reports/download/:id` - Download report

## Request Examples

### POST /api/sensors (ESP32 Data)
```json
{
  "stationId": "STATION_001",
  "waterLevel": 2.5,
  "flowVelocity": 1.2,
  "rainfall": 0.8,
  "humidity": 75,
  "temperature": 28,
  "battery": 95,
  "solarStatus": "charging",
  "communicationStatus": "connected",
  "loraSignal": -95,
  "esp32Status": "online",
  "gpsCoordinates": {
    "lat": 12.9716,
    "lon": 77.5946
  },
  "systemHealth": 98,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### POST /api/predictions/calculate
```json
{
  "waterLevel": 2.5,
  "rainfall": 45,
  "flowVelocity": 1.2,
  "humidity": 78,
  "temperature": 28,
  "historicalData": 2.3,
  "riverCapacity": 5.0,
  "soilMoisture": 65,
  "weatherForecast": "Heavy rain expected"
}
```

## Response Format

All responses follow this format:
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2024-01-15T10:30:00Z"
}
```
