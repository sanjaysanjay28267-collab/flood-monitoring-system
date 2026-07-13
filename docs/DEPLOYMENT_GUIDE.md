# Deployment Guide

## Deployment Platforms

### Heroku (Recommended for Backend)

1. **Install Heroku CLI**
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create App**
```bash
heroku create flood-monitoring-api
```

4. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_secret_key
# ... other variables
```

5. **Deploy**
```bash
git push heroku main
```

### Vercel (Recommended for Frontend)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
cd frontend
vercel
```

3. **Configure Environment**
- Add environment variables in Vercel dashboard
- Set API URL to your backend

### AWS Deployment

#### Backend on EC2

1. **Launch EC2 Instance**
   - Ubuntu 20.04 LTS
   - t2.micro or t2.small
   - Security group: allow 5000, 22

2. **Connect via SSH**
```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

3. **Install Dependencies**
```bash
sudo apt update
sudo apt install nodejs npm git
```

4. **Clone Repository**
```bash
git clone https://github.com/your-repo/flood-monitoring-system.git
cd flood-monitoring-system/backend
```

5. **Install and Run**
```bash
npm install
npm run build
npm start
```

#### Frontend on S3 + CloudFront

1. **Build Frontend**
```bash
cd frontend
npm run build
```

2. **Upload to S3**
```bash
aws s3 sync dist/ s3://your-bucket-name/
```

3. **Setup CloudFront**
   - Create distribution pointing to S3
   - Set origin domain
   - Configure caching

### Docker Deployment

#### Dockerfile for Backend
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

#### Dockerfile for Frontend
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/flood-monitoring
      - JWT_SECRET=your_secret
    depends_on:
      - mongo
    networks:
      - app-network

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - app-network

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    networks:
      - app-network

volumes:
  mongo-data:

networks:
  app-network:
    driver: bridge
```

## Database Setup

### MongoDB Atlas Cloud

1. **Create Account** at mongodb.com
2. **Create Cluster**
   - Select free tier
   - Choose region closest to deployment
3. **Create Database User**
   - Set username and password
4. **Get Connection String**
   - Copy and add to .env

### Local MongoDB

```bash
# Install MongoDB
mongod --version

# Start MongoDB
mongod

# Seed initial data
npm run seed
```

## SSL/HTTPS Setup

### Let's Encrypt (Free)

1. **Install Certbot**
```bash
sudo apt-get install certbot python3-certbot-nginx
```

2. **Generate Certificate**
```bash
sudo certbot certonly --standalone -d yourdomain.com
```

3. **Configure in Application**
- Update API_URL to https
- Configure CORS

## Monitoring & Logging

### PM2 Process Manager

```bash
npm install -g pm2

pm2 start npm --name "flood-api" -- run start
pm2 startup
pm2 save
pm2 logs
pm2 monit
```

### Logging

```bash
# View logs
heroku logs --tail

# Or with PM2
pm2 logs flood-api
```

## Scaling

### Load Balancing
- Use nginx as reverse proxy
- Setup multiple backend instances
- Configure load balancer (HAProxy/nginx)

### Caching
- Redis for session management
- Cache sensor data
- Reduce database queries

## Backup Strategy

### Database Backups
```bash
# Backup MongoDB
mongodump --uri="mongodb+srv://..." --out=./backup

# Restore MongoDB
mongorestore ./backup
```

### Automated Backups
- Enable MongoDB Atlas automated backups
- Set backup frequency to daily
- Store in S3/GCS for redundancy

## Health Checks

```bash
# Check API health
curl http://localhost:5000/health

# Monitor uptime
# Use services like UptimeRobot or Pingdom
```

## Performance Optimization

1. **Database Indexing**
   - Index stationId, timestamp
   - Index alertType, status

2. **API Caching**
   - Cache sensor data (5min)
   - Cache weather data (30min)

3. **Frontend Optimization**
   - Code splitting
   - Image optimization
   - Gzip compression

## Security Hardening

1. **Environment Variables**
   - Never commit .env
   - Use secrets management

2. **CORS Configuration**
   - Restrict origins
   - Whitelist domains

3. **Rate Limiting**
   - Implement on all endpoints
   - Stricter limits for auth

4. **Input Validation**
   - Validate all inputs
   - Sanitize data
   - Check data types
