'use client'

import { Menu as MenuIcon } from 'lucide-react'
import { Logo } from '../Logo/Logo'
import { Menu } from '../Menu/Menu'
import { ThemeButton } from '../ThemeButton/ThemeButton'
import { Drawer } from '../Drawer/Drawer'
import { useDrawer } from '@/domain/hooks/useDrawer/useDrawer'

export const Header = () => {
  const { open, toggle, closeDrawer } = useDrawer()

  const items = [
    { label: 'Accueil', href: '/' },
    { label: 'Parcours', href: '/#mycourses' },
    { label: 'Stack', href: '/#stack' },
    { label: 'Contact', href: '/#contact' },
  ]

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-white/60 dark:bg-[#060517]/60 border-b border-black/5 dark:border-white/5">
      <header className="max-w-[1550px] mx-auto flex items-center justify-between px-6 py-4">
        <Logo />
        <Menu items={items} />

        <div className="hidden md:flex gap-4">
          <ThemeButton />
        </div>

        <button onClick={toggle} className="md:hidden">
          <MenuIcon />
        </button>

        <Drawer open={open} onClose={closeDrawer}>
          <nav className="flex flex-col gap-4">
            {items.map(i => (
              <a key={i.href} href={i.href}>
                {i.label}
              </a>
            ))}
            <ThemeButton />
          </nav>
        </Drawer>
      </header>
    </div>
  )
}
