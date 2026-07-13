# AI-Powered Smart Flood Monitoring & Early Warning System

A modern, production-ready responsive website for real-time flood monitoring using IoT sensors, AI predictions, and live maps with early warning alerts.

## 🚀 Features

### Frontend
- **Modern Dashboard**: Premium glassmorphism design with dark/light mode
- **Real-Time Monitoring**: Live water level, flow velocity, rainfall, and system health cards
- **Live Google Maps**: Interactive map with color-coded markers (Green/Yellow/Red)
- **AI Flood Prediction**: Machine learning-based flood probability predictions
- **Alert Center**: Multi-channel alerts (SMS, Email, Push, Voice)
- **Reports Generation**: Daily, weekly, monthly, yearly reports (PDF/Excel/CSV)
- **Weather Integration**: Real-time weather and forecast data
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Offline Mode**: PWA support for offline functionality

### Backend
- **REST APIs**: Sensor data ingestion and retrieval
- **WebSocket Support**: Real-time updates via Socket.IO
- **Firebase Authentication**: Secure user authentication
- **MongoDB**: Scalable database for sensor history and alerts
- **MQTT Support**: IoT device communication
- **Multi-Channel Alerts**: SMS (Twilio), Email (EmailJS), Push notifications
- **AI Integration**: Google Gemini for flood predictions
- **Admin Dashboard**: Role-based access control

## 📋 Project Structure

```
flood-monitoring-system/
├── frontend/                 # React + TypeScript + Tailwind CSS + Vite
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Utility functions
│   │   ├── styles/           # Global styles
│   │   ├── services/         # API services
│   │   ├── store/            # State management (Zustand/Redux)
│   │   ├── types/            # TypeScript types
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # Entry point
│   ├── public/               # Static assets
│   ├── vite.config.ts        # Vite configuration
│   ├── tsconfig.json         # TypeScript configuration
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   ├── postcss.config.js     # PostCSS configuration
│   ├── package.json
│   └── .env.example
│
├── backend/                  # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── api/              # API routes
│   │   ├── controllers/      # Route controllers
│   │   ├── models/           # MongoDB models
│   │   ├── middleware/       # Custom middleware
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Utility functions
│   │   ├── config/           # Configuration files
│   │   ├── websocket/        # Socket.IO setup
│   │   ├── mqtt/             # MQTT broker setup
│   │   ├── auth/             # Authentication logic
│   │   └── server.ts         # Express server
│   ├── uploads/              # File uploads
│   ├── logs/                 # Application logs
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
│
├── docs/                     # Documentation
│   ├── API_DOCUMENTATION.md
│   ├── SETUP_GUIDE.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── API_KEYS_SETUP.md
│   └── ESP32_INTEGRATION.md
│
├── docker-compose.yml        # Docker Compose for local development
├── .gitignore
├── .env.example
└── README.md                 # This file
```

## 🔧 Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js**: v16.x or higher
- **npm** or **yarn**: Latest version
- **MongoDB**: v4.4 or higher (or use MongoDB Atlas)
- **Git**: Latest version
- **Docker** (optional): For containerized deployment

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/sanjaysanjay28267-collab/flood-monitoring-system.git
cd flood-monitoring-system
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file from .env.example
cp .env.example .env

# Update .env with your API keys (see below)

# Start the backend server
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install

# Create .env file from .env.example
cp .env.example .env

# Update .env with your API keys (see below)

# Start the development server
npm run dev
```

## 🔑 API Keys Setup

All required API keys are listed in `.env.example`. Follow this guide to obtain each one:

### Google Maps API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Maps JavaScript API" and "Geolocation API"
4. Create an API key
5. Add to `.env`:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_key_here
   VITE_GOOGLE_GEOLOCATION_API_KEY=your_key_here
   ```

### OpenWeather API
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the account dashboard
4. Add to `.env`:
   ```
   VITE_OPENWEATHER_API_KEY=your_key_here
   ```

### Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password, Google)
4. Copy your project configuration
5. Add to `.env`:
   ```
   VITE_FIREBASE_API_KEY=your_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_domain_here
   # ... other Firebase config
   ```

### Twilio SMS
1. Visit [Twilio Console](https://www.twilio.com/console)
2. Get your Account SID and Auth Token
3. Get a phone number
4. Add to `.env`:
   ```
   TWILIO_ACCOUNT_SID=your_sid_here
   TWILIO_AUTH_TOKEN=your_token_here
   TWILIO_PHONE_NUMBER=your_number_here
   ```

### EmailJS
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up and get your Service ID, Template ID, and Public Key
3. Add to `.env`:
   ```
   EMAILJS_SERVICE_ID=your_id_here
   EMAILJS_TEMPLATE_ID=your_id_here
   EMAILJS_PUBLIC_KEY=your_key_here
   ```

### Google Gemini API
1. Visit [Google AI Studio](https://ai.google.dev/)
2. Create an API key
3. Add to `.env`:
   ```
   VITE_GOOGLE_GEMINI_API_KEY=your_key_here
   ```

### RainViewer API
1. Go to [RainViewer](https://www.rainviewer.com/api.html)
2. Get your API key
3. Add to `.env`:
   ```
   VITE_RAINVIEWER_API_KEY=your_key_here
   ```

### ThingSpeak
1. Visit [ThingSpeak](https://thingspeak.com/)
2. Create a channel and get your Channel ID and API Key
3. Add to `.env`:
   ```
   THINGSPEAK_API_KEY=your_key_here
   THINGSPEAK_CHANNEL_ID=your_id_here
   ```

## 🚀 Running the Application

### Development Mode

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

Access the application at `http://localhost:5173`

### Production Build

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

## 💡 ESP32 Integration

To integrate ESP32 IoT sensors:

1. **Upload code to ESP32** using Arduino IDE
2. **Configure WiFi and API endpoint** in ESP32 code
3. **Send data to** `POST /api/sensors/data`

Example ESP32 payload:
```json
{
  "stationId": "station_001",
  "waterLevel": 2.5,
  "flowVelocity": 1.2,
  "rainfall": 0.8,
  "humidity": 75,
  "temperature": 28,
  "battery": 95,
  "solarStatus": "charging",
  "gpsLat": 12.9716,
  "gpsLon": 77.5946,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 📚 Documentation

- [API Documentation](./docs/API_DOCUMENTATION.md)
- [Setup Guide](./SETUP_GUIDE.md)
- [Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)
- [ESP32 Integration](./docs/ESP32_INTEGRATION.md)

## 🎨 UI Features

- **Glassmorphism Design**: Modern frosted glass effect cards
- **Dark/Light Mode**: Toggle between themes
- **Smooth Animations**: Gradient backgrounds and transitions
- **Responsive Layout**: Mobile-first design approach
- **Accessibility**: WCAG 2.1 compliant
- **Professional Theme**: Government-style dashboard aesthetic

## 🔐 Security

- **JWT Authentication**: Secure token-based auth
- **Firebase Security Rules**: Database protection
- **CORS Configuration**: Cross-origin request handling
- **Environment Variables**: Sensitive data protection
- **Input Validation**: Server-side validation
- **Password Encryption**: bcrypt hashing

## 📊 Database Models

### Sensor Data
```typescript
{
  _id: ObjectId,
  stationId: string,
  waterLevel: number,
  flowVelocity: number,
  rainfall: number,
  humidity: number,
  temperature: number,
  battery: number,
  solarStatus: string,
  gpsCoordinates: { lat: number, lon: number },
  timestamp: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Alerts
```typescript
{
  _id: ObjectId,
  stationId: string,
  alertType: 'critical' | 'warning' | 'normal',
  message: string,
  riskLevel: number,
  channels: ['sms', 'email', 'push', 'voice'],
  status: 'sent' | 'pending' | 'failed',
  createdAt: Date
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@floodmonitoring.com or open an issue on GitHub.

## 🛣️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced AI predictions (LSTM models)
- [ ] Drone integration for aerial surveys
- [ ] Satellite data integration
- [ ] Community reporting feature
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

## 👨‍💻 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- Google Maps & Geolocation APIs
- OpenWeatherMap API
- Firebase by Google
- Twilio for SMS services
- EmailJS for email services
