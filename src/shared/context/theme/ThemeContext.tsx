"use client";
// contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  getTheme: () => Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
}) => {
  // 1. Initialize theme safely
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  // 2. Start resolvedTheme with a fallback
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // 3. Handle initial load (Read from localStorage)
  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null;
    if (stored) {
      setThemeState(stored);
    }
  }, [storageKey]);

  // 4. Centralized effect for updating the DOM and resolvedTheme
  useEffect(() => {
    const root = window.document.documentElement;

    const updateTheme = () => {
      let current: 'light' | 'dark';

      if (theme === 'system') {
        current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        current = theme;
      }

      setResolvedTheme(current);
      root.classList.remove('light', 'dark');
      root.classList.add(current);
    };

    updateTheme();

    // Listen for system preference changes if theme is 'system'
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateTheme);
      return () => mediaQuery.removeEventListener('change', updateTheme);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(storageKey, newTheme);
  };

  const getTheme = (): Theme => {
    return theme;
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const newResolvedTheme = theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      : theme;

    setResolvedTheme(newResolvedTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newResolvedTheme);
  }, [theme]);

  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        const newResolvedTheme = mediaQuery.matches ? 'dark' : 'light';
        setResolvedTheme(newResolvedTheme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newResolvedTheme);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
    getTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};