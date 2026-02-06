'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/domain/hooks/useTheme/useTheme'

export const ThemeButton = () => {
  const { theme, toggle } = useTheme()

  return (
    <button onClick={() => toggle()} className="p-2 rounded-md ">
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  )
}
