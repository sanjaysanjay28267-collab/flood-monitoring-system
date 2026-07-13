import { create } from 'zustand'

interface ThemeStore {
  isDarkMode: boolean
  toggleTheme: () => void
  setTheme: (isDark: boolean) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isDarkMode: localStorage.getItem('theme') === 'dark',
  toggleTheme: () =>
    set((state) => {
      const newDarkMode = !state.isDarkMode
      localStorage.setItem('theme', newDarkMode ? 'dark' : 'light')
      return { isDarkMode: newDarkMode }
    }),
  setTheme: (isDark) => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    set({ isDarkMode: isDark })
  },
}))
