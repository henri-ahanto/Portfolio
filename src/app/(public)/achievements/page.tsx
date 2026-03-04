'use client'

import { useState, useMemo } from 'react'
import { useAchievements } from '@/shared/hooks/useAchievements/useAchievements'
import { AchievementCard } from '@/shared/ui/components/Achievements/AchievementCard'
import { status } from '@/shared/const/Achievements'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, Filter, Rocket } from 'lucide-react'

export default function AchievementsPage() {
  const { data: achievements = [], loading } = useAchievements()
  const [activeFilter, setActiveFilter] = useState<string>('all')

  // Logique de filtrage
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return achievements
    return achievements.filter(a => a.status === activeFilter)
  }, [achievements, activeFilter])

  const filters = [
    { id: 'all', label: 'Tous' },
    { id: status.FINI, label: 'Terminés' },
    { id: status.EN_COURS, label: 'En cours' },
    { id: status.DEMARRER, label: 'Lancés' },
  ]

  if (loading) return <div className="min-h-screen bg-[#050508] flex items-center justify-center text-blue-500 animate-pulse font-black">CHARGEMENT...</div>

  return (
    <main className="min-h-screen bg-[#050508] pt-32 pb-20 px-4">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header de la page */}
        <header className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-blue-500 mb-4"
            >
              <Rocket size={20} />
              <span className="text-xs font-black uppercase tracking-[0.4em]">Portfolio</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic"
            >
              Mes <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-violet-500">Réalisations</span>
            </motion.h1>
          </div>

          {/* Filtres Stylisés */}
          <div className="flex flex-wrap gap-2 bg-white/5 p-2 rounded-4xl border border-white/5 backdrop-blur-md">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === f.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-500 hover:text-white'
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </header>

        {/* Grille de Projets avec Animation de présence */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <AchievementCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-40 text-center">
            <LayoutGrid size={48} className="mx-auto text-slate-800 mb-4" />
            <p className="text-slate-500 font-bold uppercase tracking-widest">Aucun projet dans cette catégorie</p>
          </div>
        )}
      </div>
    </main>
  )
}