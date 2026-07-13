import React from 'react'
import { Link } from 'react-router-dom'
import { Cloud, Droplets, AlertTriangle, TrendingUp } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import { motion } from 'framer-motion'

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore()
  const [isOpen, setIsOpen] = React.useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Live Monitoring', href: '/live-monitoring' },
    { label: 'Live Map', href: '/live-map' },
    { label: 'AI Prediction', href: '/ai-prediction' },
    { label: 'Sensor Dashboard', href: '/sensor-dashboard' },
    { label: 'Alert Center', href: '/alert-center' },
    { label: 'Reports', href: '/reports' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/20 dark:border-slate-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 group-hover:shadow-lg transition-shadow">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">FloodGuard</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Early Warning System</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/50 dark:bg-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-600/70 transition-colors"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.657-9.193a1 1 0 00-1.414 0l-.707.707A1 1 0 005.05 13.536l.707.707a1 1 0 001.414-1.414l-.707-.707zm0 2.828a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Login Button */}
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium hover:shadow-lg transition-shadow hidden sm:block"
            >
              Login
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-700/50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 space-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
