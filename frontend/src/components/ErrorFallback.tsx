import React from 'react'

const ErrorFallback: React.FC<{ error: Error }> = ({ error }) => {
  return (
    <div className="min-h-96 flex items-center justify-center">
      <div className="glass rounded-2xl p-8 text-center max-w-md">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Oops! Something went wrong</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-shadow"
        >
          Reload Page
        </button>
      </div>
    </div>
  )
}

export default ErrorFallback
