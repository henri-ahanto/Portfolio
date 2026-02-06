'use client'

import { useThemeContext } from '@/domain/context/theme/ThemeContext'

export const useTheme = () => {
  return useThemeContext()
}
