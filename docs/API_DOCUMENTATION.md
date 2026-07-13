# Backend API Documentation

## Complete API Reference

### Authentication

#### POST /api/auth/register
Register new user account

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "phone": "+91-9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "token": "jwt_token_here"
  }
}
```

#### POST /api/auth/login
Login to existing account

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": { "_id": "...", "email": "..." }
  }
}
```

---

### Sensors

#### GET /api/sensors
Get all sensor data with pagination

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 50)
- `sortBy` (default: -timestamp)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "sensor_id",
      "stationId": "STATION_001",
      "waterLevel": 2.5,
      "flowVelocity": 1.2,
      "rainfall": 0.8,
      "humidity": 75,
      "temperature": 28,
      "battery": 95,
      "solarStatus": "charging",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 1000,
    "pages": 20,
    "currentPage": 1
  }
}
```

#### GET /api/sensors/station/:stationId
Get sensor data for specific station

#### GET /api/sensors/latest
Get latest readings from all stations

**Query Parameters:**
- `limit` (default: 50)

#### POST /api/sensors
Create new sensor data (from ESP32)

**Request:**
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

#### GET /api/sensors/history/:stationId
Get historical sensor data

**Query Parameters:**
- `startDate` (ISO string)
- `endDate` (ISO string)
- `limit` (default: 100)

---

### Stations

#### GET /api/stations
Get all monitoring stations

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "station_id",
      "stationId": "STATION_001",
      "name": "River Godavari - Nashik",
      "location": {
        "lat": 19.997,
        "lon": 73.7997
      },
      "type": "river",
      "riskLevel": "warning",
      "district": "Nashik",
      "state": "Maharashtra",
      "lastUpdated": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### GET /api/stations/:id
Get station details

#### POST /api/stations
Create new station

**Request:**
```json
{
  "stationId": "STATION_001",
  "name": "River Godavari - Nashik",
  "location": { "lat": 19.997, "lon": 73.7997 },
  "type": "river",
  "district": "Nashik",
  "state": "Maharashtra",
  "river": "Godavari",
  "capacity": 5.0
}
```

#### PUT /api/stations/:id
Update station information

#### DELETE /api/stations/:id
Delete station

#### GET /api/stations/district/:district
Get all stations in a district

#### GET /api/stations/location
Get stations near coordinates

**Query Parameters:**
- `lat` (latitude)
- `lon` (longitude)
- `radius` (default: 50km)

---

### Alerts

#### GET /api/alerts
Get all alerts

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 50)
- `type` (critical|warning|normal)
- `status` (sent|pending|failed)

#### GET /api/alerts/station/:stationId
Get alerts for specific station

#### GET /api/alerts/type/:type
Get alerts by type

#### GET /api/alerts/recent
Get recent alerts

**Query Parameters:**
- `limit` (default: 20)

#### POST /api/alerts
Create new alert

**Request:**
```json
{
  "stationId": "STATION_001",
  "alertType": "critical",
  "message": "Water level critical at River Godavari",
  "riskLevel": 95,
  "channels": ["sms", "email", "push"],
  "recipients": ["officer@example.com", "+91-9876543210"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "alert_id",
    "stationId": "STATION_001",
    "alertType": "critical",
    "message": "Water level critical at River Godavari",
    "status": "sent",
    "sentVia": ["sms", "email", "push"],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### PUT /api/alerts/:id
Update alert status

---

### Predictions

#### GET /api/predictions/:stationId
Get latest AI prediction for station

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "prediction_id",
    "stationId": "STATION_001",
    "floodProbability": 35,
    "estimatedOverflowTime": "2024-01-15T22:30:00Z",
    "riskLevel": "medium",
    "confidence": 92,
    "recommendedAction": "Monitor water levels. Issue warning alerts.",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### POST /api/predictions/calculate
Calculate flood prediction

**Request:**
```json
{
  "stationId": "STATION_001",
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

#### POST /api/predictions/batch
Get predictions for multiple stations

**Request:**
```json
{
  "stationIds": ["STATION_001", "STATION_002", "STATION_003"]
}
```

#### GET /api/predictions/history/:stationId
Get prediction history

**Query Parameters:**
- `days` (default: 7)

---

### Weather

#### GET /api/weather/current
Get current weather

**Query Parameters:**
- `lat` (latitude)
- `lon` (longitude)

**Response:**
```json
{
  "success": true,
  "data": {
    "temperature": 28,
    "feelsLike": 32,
    "humidity": 75,
    "pressure": 1013,
    "windSpeed": 12,
    "windDirection": 180,
    "cloudCover": 60,
    "visibility": 10,
    "uvIndex": 7,
    "precipitationProbability": 70,
    "description": "Partly cloudy with rain",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

#### GET /api/weather/forecast
Get weather forecast

**Query Parameters:**
- `lat` (latitude)
- `lon` (longitude)
- `days` (default: 7)

#### GET /api/weather/location
Get weather by location name

**Query Parameters:**
- `location` (city/district name)

---

### Reports

#### GET /api/reports
Get all reports

#### POST /api/reports/generate
Generate new report

**Request:**
```json
{
  "title": "Daily Flood Report",
  "type": "daily",
  "startDate": "2024-01-15T00:00:00Z",
  "endDate": "2024-01-15T23:59:59Z",
  "stationIds": ["STATION_001", "STATION_002"],
  "format": "pdf"
}
```

#### GET /api/reports/download/:id
Download report

**Query Parameters:**
- `format` (pdf|excel|csv)

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid request parameters",
  "details": { "field": "message" }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Authentication required",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Insufficient permissions",
  "message": "You don't have access to this resource"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found",
  "message": "Station not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Error details in development mode"
}
```

## Rate Limiting

- General endpoints: 100 requests/minute
- Sensor data submission: 1000 requests/minute
- Authentication endpoints: 10 requests/minute

## Authentication

Include JWT token in headers:
```
Authorization: Bearer your_jwt_token_here
```
