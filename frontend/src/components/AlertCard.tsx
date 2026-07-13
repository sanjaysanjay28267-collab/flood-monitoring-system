import React from 'react'
import { AlertTriangle, AlertCircle, Info } from 'lucide-react'
import type { Alert } from '@/types'

interface AlertCardProps {
  alert: Alert
  onDismiss?: () => void
}

const AlertCard: React.FC<AlertCardProps> = ({ alert, onDismiss }) => {
  const alertIcons = {
    critical: <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />,
    normal: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  }

  const alertBgColors = {
    critical: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    normal: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  }

  const alertTextColors = {
    critical: 'text-red-900 dark:text-red-100',
    warning: 'text-yellow-900 dark:text-yellow-100',
    normal: 'text-blue-900 dark:text-blue-100',
  }

  return (
    <div className={`glass rounded-xl p-4 border ${alertBgColors[alert.alertType]} flex gap-4`}>
      <div className="flex-shrink-0 mt-0.5">{alertIcons[alert.alertType]}</div>
      <div className="flex-grow">
        <p className={`font-semibold text-sm ${alertTextColors[alert.alertType]}`}>
          {alert.message}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Station: {alert.stationId} • Risk Level: {alert.riskLevel}%
        </p>
        {alert.channels && alert.channels.length > 0 && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sent via: {alert.channels.join(', ').toUpperCase()}
          </p>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default AlertCard
