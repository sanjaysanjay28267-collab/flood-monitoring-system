// Format number to locale string
export const formatNumber = (num: number, locale: string = 'en-US'): string => {
  return new Intl.NumberFormat(locale).format(num)
}

// Format percentage
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`
}

// Format bytes
export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * Math.pow(10, dm)) / Math.pow(10, dm) + ' ' + sizes[i]
}

// Get risk level color
export const getRiskLevelColor = (
  level: 'normal' | 'warning' | 'danger' | 'low' | 'medium' | 'high' | 'critical'
): string => {
  const colors: Record<string, string> = {
    normal: 'text-green-600 dark:text-green-400',
    low: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    medium: 'text-yellow-600 dark:text-yellow-400',
    danger: 'text-red-600 dark:text-red-400',
    high: 'text-red-600 dark:text-red-400',
    critical: 'text-red-700 dark:text-red-300',
  }
  return colors[level] || 'text-slate-600'
}

// Get background color based on risk level
export const getRiskLevelBgColor = (
  level: 'normal' | 'warning' | 'danger' | 'low' | 'medium' | 'high' | 'critical'
): string => {
  const colors: Record<string, string> = {
    normal: 'bg-green-50 dark:bg-green-900/20',
    low: 'bg-green-50 dark:bg-green-900/20',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20',
    medium: 'bg-yellow-50 dark:bg-yellow-900/20',
    danger: 'bg-red-50 dark:bg-red-900/20',
    high: 'bg-red-50 dark:bg-red-900/20',
    critical: 'bg-red-100 dark:bg-red-900/40',
  }
  return colors[level] || 'bg-slate-50 dark:bg-slate-900/20'
}
