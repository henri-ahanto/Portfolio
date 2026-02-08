'use client'

import { ReactNode, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export const DrawerItem = ({ 
  href, 
  label, 
  icon, 
  onClick 
}: { 
  href: string, 
  label: string, 
  icon?: ReactNode,
  onClick?: () => void 
}) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} onClick={onClick} className="relative group block w-full mb-2">
      <div className={`
        relative z-10 flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300
        ${isActive 
          ? 'text-blue-500 dark:text-blue-400' 
          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }
      `}>
        {/* Icône avec effet de scale au survol */}
        {icon && (
          <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
            {icon}
          </span>
        )}
        
        <span className="font-bold tracking-tight text-sm uppercase">
          {label}
        </span>

        {/* Indicateur de point pour l'item actif */}
        {isActive && (
          <motion.div 
            layoutId="activeDot"
            className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
          />
        )}
      </div>

      {/* Background de l'item Actif / Hover */}
      <AnimatePresence>
        {(isActive || false) && (
          <motion.div
            layoutId="drawerActiveBg"
            className="absolute inset-0 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      
      {/* Effet de Hover subtil (si non actif) */}
      {!isActive && (
        <div className="absolute inset-0 bg-slate-50 dark:bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity z-0 border border-transparent group-hover:border-slate-200 dark:group-hover:border-white/5" />
      )}
    </Link>
  )
}