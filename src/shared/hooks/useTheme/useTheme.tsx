'use client'

import { useThemeContext } from '@/shared/context/theme/ThemeContext'

export const useTheme = () => {
  return useThemeContext()
}
