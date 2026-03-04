'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Book, 
  Layers, 
  Trophy, 
  Mail, 
  Settings, 
  ChevronRight,
  Sparkles
} from 'lucide-react'

export const Sidebar = () => {
  const pathname = usePathname()

  const items = [
    { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Parcours', href: '/dashboard/parcours', icon: <Book size={20} /> },
    { label: 'Stack', href: '/dashboard/stack', icon: <Layers size={20} /> },
    { label: 'Achievements', href: '/dashboard/achievements', icon: <Trophy size={20} /> },
    { label: 'Messages', href: '/dashboard/messages', icon: <Mail size={20} /> },
    { label: 'Static Content', href: '/dashboard/static', icon: <Sparkles size={20} /> },
    { label: 'Settings', href: '/dashboard/settings', icon: <Settings size={20} /> },
  ]

  return (
    <aside className="w-72 h-screen sticky top-0 bg-[#050508] border-r border-white/5 p-6 hidden md:flex flex-col">
      {/* Logo / Title Area */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <span className="text-white font-black text-xl">H</span>
        </div>
        <div>
          <h2 className="text-lg font-bold text-white leading-none">Admin</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-1">Control Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {items.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className="relative group flex items-center justify-between p-3 rounded-xl transition-all duration-300"
            >
              {/* Background Highlight on Active */}
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute inset-0 bg-linear-to-r from-blue-600/10 to-violet-600/5 border border-blue-500/20 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <div className={`relative z-10 flex gap-3 items-center transition-colors duration-300 ${
                isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'
              }`}>
                <span className={`${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`}>
                  {item.icon}
                </span>
                <span className="font-medium text-sm">{item.label}</span>
              </div>

              {isActive && (
                <motion.div 
                   initial={{ opacity: 0, x: -5 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="relative z-10"
                >
                  <ChevronRight size={14} className="text-blue-400" />
                </motion.div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer Info / User Quick Profile */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5">
          <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-slate-300">Connected to Supabase</span>
          </div>
        </div>
      </div>
    </aside>
  )
}