'use client'

import { useStaticContent } from '@/domain/hooks/useStaticContent/useStaticContent'
import { StaticRow } from '@/ui/components/static/StaticRow/StaticRow'
import { StaticCreateForm } from '@/ui/components/static/StaticCreateForm/StaticCreateForm'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Hash, Type, Info, Search } from 'lucide-react'
import { useState } from 'react'

export default function StaticDashboardPage() {
  const { data = [], loading, update, remove, create } = useStaticContent()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = data.filter(item =>
    item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.value?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto min-h-screen text-slate-200">
      {/* Header */}
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-amber-400 to-orange-500 flex items-center gap-3">
            <Sparkles className="text-amber-500" /> Contenu Statique
          </h1>
          <p className="text-slate-500 mt-2">Gérez les textes, badges et libellés de votre portfolio.</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Rechercher une clé ou un texte..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-white/5 rounded-2xl focus:border-amber-500/50 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Formulaire de création - Format compact et stylisé */}
        <aside className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            {/* Décoration en fond */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full" />

            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Hash className="text-amber-500" size={20} /> Nouvelle Clé
            </h2>

            <StaticCreateForm onCreate={create} />

            <div className="mt-6 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10">
              <p className="text-xs text-amber-200/50 leading-relaxed flex gap-2">
                <Info size={24} className="shrink-0" />
                Utilisez des clés explicites comme <code className="text-amber-400">hero.title</code> pour une meilleure maintenance.
              </p>
            </div>
          </div>
        </aside>

        {/* Liste des contenus */}
        <main className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-6 px-2">
            <Type size={18} className="text-slate-500" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Clés enregistrées ({filteredData.length})</h2>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex flex-col items-center py-20 gap-4">
                <div className="w-10 h-10 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                <p className="text-slate-500 text-sm animate-pulse">Synchronisation des données...</p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredData.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <StaticRow
                      item={item}
                      onSave={update}
                      onDelete={remove}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            {!loading && filteredData.length === 0 && (
              <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem]">
                <p className="text-slate-600">Aucun contenu statique trouvé.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}