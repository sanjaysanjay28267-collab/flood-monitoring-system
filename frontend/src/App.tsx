import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useThemeStore } from '@/store/themeStore'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HomePage from '@/pages/HomePage'
import LiveMonitoringPage from '@/pages/LiveMonitoringPage'
import LiveMapPage from '@/pages/LiveMapPage'
import AIPredictionPage from '@/pages/AIPredictionPage'
import SensorDashboardPage from '@/pages/SensorDashboardPage'
import AlertCenterPage from '@/pages/AlertCenterPage'
import ReportsPage from '@/pages/ReportsPage'
import AdminDashboardPage from '@/pages/AdminDashboardPage'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import '@/styles/globals.css'

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode)

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 transition-colors duration-300">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/live-monitoring" element={<LiveMonitoringPage />} />
              <Route path="/live-map" element={<LiveMapPage />} />
              <Route path="/ai-prediction" element={<AIPredictionPage />} />
              <Route path="/sensor-dashboard" element={<SensorDashboardPage />} />
              <Route path="/alert-center" element={<AlertCenterPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </div>
  )
}

export default App
