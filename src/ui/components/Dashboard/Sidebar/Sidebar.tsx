'use client'

import Link from 'next/link'
import { LayoutDashboard, Book, Layers, Trophy, Mail, Settings } from 'lucide-react'

export const Sidebar = () => {
  const items = [
    { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard /> },
    { label: 'Parcours', href: '/dashboard/parcours', icon: <Book /> },
    { label: 'Stack', href: '/dashboard/stack', icon: <Layers /> },
    { label: 'Achievements', href: '/dashboard/achievements', icon: <Trophy /> },
    { label: 'Messages', href: '/dashboard/messages', icon: <Mail /> },
    { label: 'Settings', href: '/dashboard/settings', icon: <Settings /> },
    {
      label: 'Static Content',
      href: '/dashboard/static',
      icon: '🧩',
    },
  ]

return (
  <aside className="w-72 bg-black p-6 hidden md:block">
    <h2 className="text-xl font-bold mb-8">Admin</h2>
    <nav className="flex flex-col gap-4">
      {items.map(i => (
        <Link key={i.href} href={i.href} className="flex gap-3 items-center hover:text-purple-400">
          {i.icon}
          {i.label}
        </Link>
      ))}
    </nav>
  </aside>
)
}
