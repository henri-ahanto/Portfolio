'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/domain/services/supabaseClient'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Trophy,
  Layers,
  Mail,
  TrendingUp,
  ArrowUpRight,
  Activity
} from 'lucide-react'
import { stat } from 'fs'

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    const fetch = async () => {
      const [
        { count: parcours },
        { count: achievements },
        { count: stacks },
        { count: messages }
      ] = await Promise.all([
        supabase.from('parcours').select('*', { count: 'exact', head: true }),
        supabase.from('achievements').select('*', { count: 'exact', head: true }),
        supabase.from('stacks').select('*', { count: 'exact', head: true }),
        supabase.from('messages').select('*', { count: 'exact', head: true }),
      ])

      setStats({
        parcours: { val: parcours, icon: <BookOpen />, color: 'from-blue-500 to-cyan-400' },
        achievements: { val: achievements, icon: <Trophy />, color: 'from-violet-500 to-purple-400' },
        stacks: { val: stacks, icon: <Layers />, color: 'from-amber-500 to-orange-400' },
        messages: { val: messages, icon: <Mail />, color: 'from-emerald-500 to-teal-400' },
      })
    }
    fetch()
    console.log(stats)
  }, [])

  if (!stats) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-white flex items-center gap-3">
          <Activity className="text-blue-500" /> Dashboard
        </h1>
        <p className="text-slate-500 mt-2">Bienvenue, Henri. Voici l'état actuel de ton portfolio.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {Object.entries(stats).map(([key, data]: any, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-slate-900/40 border border-white/5 p-6 rounded-4xl overflow-hidden hover:bg-slate-900/60 transition-all"
          >
            {/* Gradient Glow */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 bg-linear-to-br ${data.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />

            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${data.color} flex items-center justify-center text-white shadow-lg shadow-blue-500/10 mb-4`}>
                {data.icon}
              </div>

              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{key}</p>
              <div className="flex items-end gap-2 mt-1">
                <p className="text-4xl font-black text-white">{data.val}</p>
                <span className="text-emerald-500 text-xs font-bold mb-2 flex items-center">
                  <ArrowUpRight size={14} /> +12%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Areas (Placeholders) */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/20 border border-white/5 rounded-[2.5rem] p-8 min-h-[300px] flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
              <TrendingUp size={20} className="text-blue-400" /> Activité Récente
            </h2>
            <p className="text-slate-500 text-sm italic">Les dernières statistiques de visite seront bientôt disponibles ici.</p>
          </div>
          <div className="h-32 w-full bg-linear-to-t from-blue-500/5 to-transparent border-b border-blue-500/20 rounded-b-3xl" />
        </div>

        <div className="bg-linear-to-br from-indigo-600/20 to-violet-700/20 border border-violet-500/20 rounded-[2.5rem] p-8 relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-white mb-4">Quick Tip</h2>
            <p className="text-indigo-200/70 text-sm leading-relaxed">
              Pense à épingler tes projets les plus récents sur la page d'accueil pour maximiser leur visibilité auprès des recruteurs.
            </p>
            <button className="mt-6 px-5 py-2.5 bg-white text-indigo-950 rounded-full text-sm font-bold hover:scale-105 transition-transform">
              Voir les projets
            </button>
          </div>
          <Trophy className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
        </div>
      </div>
    </div>
  )
}