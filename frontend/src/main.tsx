import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { registerServiceWorker } from './utils/pwa.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Register Service Worker for PWA support
if ('serviceWorker' in navigator) {
  registerServiceWorker()
}
