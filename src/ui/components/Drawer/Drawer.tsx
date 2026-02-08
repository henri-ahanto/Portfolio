'use client'

import { X, Sparkles } from 'lucide-react'
import { ReactNode, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// --- Composant Principal Drawer ---
export const Drawer = ({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-100 bg-black/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="fixed left-0 top-0 z-1001 w-[300px] h-svh 
                       bg-white/90 dark:bg-slate-950/80 
                       backdrop-blur-2xl shadow-2xl 
                       border-r border-slate-200 dark:border-white/10 
                       p-6 flex flex-col"
          >
            {/* Lueur v4 en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-violet-500 to-emerald-500 opacity-70 dark:block hidden" />

            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg">
                  <Sparkles size={16} className="text-white" />
                </div>
                <span className="font-black text-lg tracking-tighter dark:text-white text-slate-900 uppercase">Menu</span>
              </div>

              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1 // Animation en cascade des enfants
                    }
                  }
                }}
              >
                {children}
              </motion.div>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/5 text-center">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 italic">
                © 2026 — Portfolio Premium
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}