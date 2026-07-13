import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Download } from 'lucide-react'

const ReportsPage: React.FC = () => {
  const reports = [
    { title: 'Daily Report - Jan 15', date: 'January 15, 2024', type: 'daily' },
    { title: 'Weekly Report - Week 3', date: 'January 1-7, 2024', type: 'weekly' },
    { title: 'Monthly Report - December', date: 'December 2023', type: 'monthly' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Reports</h1>
        <p className="text-slate-600 dark:text-slate-400">Generate and download monitoring reports</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        {reports.map((report, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.01 }}
            className="glass rounded-2xl p-6 flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{report.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{report.date}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-white/50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default ReportsPage
