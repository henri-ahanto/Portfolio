'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme((theme === 'light' ? 'dark' : 'light'))
  }

  return (
    <button onClick={() => toggleTheme()} className="p-2 rounded-md ">
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" /> 
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  )
}
