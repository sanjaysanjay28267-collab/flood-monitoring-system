# Complete Setup Guide

## Prerequisites

- Node.js v16.x or higher
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git
- GitHub account

## Step 1: Clone Repository

```bash
git clone https://github.com/sanjaysanjay28267-collab/flood-monitoring-system.git
cd flood-monitoring-system
```

## Step 2: Backend Setup

### Install Dependencies

```bash
cd backend
npm install
```

### Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your API keys (see README.md for detailed instructions).

### Start MongoDB

Option A: Local MongoDB
```bash
mongod
```

Option B: MongoDB Atlas
- Update `MONGODB_URI` in `.env` with your connection string

### Run Backend

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm run build
npm start
```

Backend will be running at `http://localhost:5000`

## Step 3: Frontend Setup

### Install Dependencies

```bash
cd ../frontend
npm install
```

### Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your API keys.

### Run Frontend

```bash
# Development mode
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Frontend will be running at `http://localhost:5173`

## Step 4: Verify Installation

1. Open `http://localhost:5173` in your browser
2. Navigate to "Live Monitoring" - should show dashboard
3. Navigate to "Live Map" - should display Google Map
4. Test data submission from ESP32 or Postman

## Troubleshooting

### Port Already in Use

```bash
# Find and kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Find and kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### MongoDB Connection Error

- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify database permissions

### API Key Errors

- Double-check `.env` values
- Ensure no extra spaces or quotes
- Verify API keys are active in respective consoles

### CORS Errors

- Check `CORS_ORIGIN` in backend `.env`
- Should match frontend URL (http://localhost:5173)

## Docker Setup (Optional)

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```
