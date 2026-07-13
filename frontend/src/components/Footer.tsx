import React from 'react'
import { MapPin, Mail, Phone, Github } from 'lucide-react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">FloodGuard</h3>
            <p className="text-slate-400 text-sm">AI-powered smart flood monitoring and early warning system for disaster management.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/live-monitoring" className="hover:text-blue-400 transition-colors">Dashboard</a></li>
              <li><a href="/live-map" className="hover:text-blue-400 transition-colors">Live Map</a></li>
              <li><a href="/ai-prediction" className="hover:text-blue-400 transition-colors">AI Prediction</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4" />
                support@floodguard.com
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4" />
                +91 1800-FLOOD-911
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4" />
                Disaster Management HQ
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-400">
              &copy; {currentYear} FloodGuard. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
