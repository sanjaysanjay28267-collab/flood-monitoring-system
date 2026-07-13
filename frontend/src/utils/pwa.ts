// Register PWA service worker
export const registerServiceWorker = async () => {
  try {
    const registration = await navigator.serviceWorker.register('/sw.js')
    console.log('Service Worker registered:', registration)
  } catch (error) {
    console.log('Service Worker registration failed:', error)
  }
}

// Check for app updates
export const checkForUpdates = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.getRegistration()
    if (registration) {
      registration.update()
    }
  }
}
