import React from 'react'
import { Loader } from 'lucide-react'

interface LoadingProps {
  message?: string
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-96">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-spin" />
        <div className="absolute inset-2 rounded-full bg-white dark:bg-slate-950" />
      </div>
      <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{message}</p>
    </div>
  )
}

export default Loading
