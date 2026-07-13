# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 16+ 
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Installation

```bash
# Clone repository
git clone https://github.com/sanjaysanjay28267-collab/flood-monitoring-system.git
cd flood-monitoring-system

# Backend Setup
cd backend
cp .env.example .env
npm install

# Update .env with your keys (see below)
# Then run:
npm run dev

# Frontend Setup (in new terminal)
cd ../frontend
cp .env.example .env
npm install

# Update .env with API URL
# Then run:
npm run dev
```

### Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/api

## 🔑 Essential API Keys

### 1. Google Maps API
1. Go to https://console.cloud.google.com/
2. Create project → Enable "Maps JavaScript API"
3. Create API key
4. Add to `.env`:
```
VITE_GOOGLE_MAPS_API_KEY=your_key_here
```

### 2. Firebase
1. Go to https://console.firebase.google.com/
2. Create project
3. Get config from project settings
4. Add to `.env`:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
...
```

### 3. OpenWeather API
1. Sign up at https://openweathermap.org/api
2. Get free API key
3. Add to `.env`:
```
VITE_OPENWEATHER_API_KEY=your_key_here
```

### 4. Twilio (Optional - for SMS)
1. Sign up at https://www.twilio.com/
2. Get Account SID, Auth Token, Phone Number
3. Add to backend `.env`:
```
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1234567890
```

## 📦 Docker Setup (All-in-One)

```bash
# Start entire stack
docker-compose up -d

# Access:
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
# MongoDB: localhost:27017
# MQTT: localhost:1883
```

## 🌊 Features Available

✅ Real-time monitoring dashboard
✅ Live water level tracking
✅ AI flood predictions
✅ Interactive maps with markers
✅ Multi-channel alerts (SMS, Email, Push)
✅ Reports generation (PDF/Excel/CSV)
✅ Dark/Light mode
✅ Mobile responsive
✅ REST APIs for ESP32 integration
✅ WebSocket for real-time updates
✅ Admin dashboard

## 📱 ESP32 Integration

Send sensor data to: `POST /api/sensors`

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
  "gpsCoordinates": {"lat": 12.9716, "lon": 77.5946},
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 🚀 Deployment

### Heroku (Backend)
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_atlas_uri
git push heroku main
```

### Vercel (Frontend)
```bash
vercel
# Follow prompts, set environment variables
```

## 📚 Documentation
- API Docs: [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)
- ESP32 Guide: [docs/ESP32_INTEGRATION.md](docs/ESP32_INTEGRATION.md)
- Deployment: [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)
- Setup: [SETUP_GUIDE.md](SETUP_GUIDE.md)

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### MongoDB Connection Error
```bash
# Start local MongoDB
mongod
```

### Missing API Keys
- Check `.env` file exists
- Verify all keys are correct
- Ensure no extra spaces

## 📞 Support
- Email: support@floodguard.com
- Issues: GitHub Issues
- Docs: See docs/ folder

## 🎯 Next Steps
1. Configure all API keys
2. Setup MongoDB
3. Run locally to test
4. Deploy to production
5. Setup ESP32 sensors
6. Configure alerts

---

**Happy Flood Monitoring! 🌊**
