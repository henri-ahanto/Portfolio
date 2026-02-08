'use client'

import { useAchievements } from '@/domain/hooks/useAchievements/useAchievements'
import { achievementsService } from '@/domain/services/achievements.service'
import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Image as ImageIcon, Save, X, Trophy, Star, Eye, Globe, Github } from 'lucide-react'
import { AdminProjectCard } from '@/ui/components/Achievements/Dashboard/AdminProjectCard'
import { STATUS_CONFIG } from '@/domain/const/Achievements'

const TiptapEditor = dynamic(() => import('@/ui/components/TipTap/TipTapEditor').then(mod => mod.TiptapEditor), {
  ssr: false,
  loading: () => <div className="h-40 bg-slate-900/50 rounded-2xl animate-pulse border border-white/5" />
})

export default function AchievementsAdminPage() {
  const { data = [], refresh } = useAchievements()
  const [form, setForm] = useState<any>({ is_pinned: false, description: '' })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const stats = useMemo(() => ({
    total: data.length,
    pinned: data.filter((a: any) => a.is_pinned).length,
    withLinks: data.filter((a: any) => a.demo_link || a.repository_link).length
  }), [data])

  const submit = async () => {
    setLoading(true)
    try {
      if (editingId) {
        await achievementsService.update(editingId, form)
      } else {
        if (!selectedFile) return alert("Image requise")
        await achievementsService.create({ ...form, image: selectedFile })
      }
      cancelEdit()
      refresh()
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }

  const cancelEdit = () => {
    setForm({ is_pinned: false, description: '' })
    setEditingId(null)
    setSelectedFile(null)
  }

  return (
    <div className="min-h-screen bg-[#050508] text-slate-200 p-4 md:p-8">
      {/* STATS BAR */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard label="Total Projets" val={stats.total} icon={<Trophy className="text-blue-400" />} />
        <StatCard label="Épinglés" val={stats.pinned} icon={<Star className="text-amber-400" />} />
        <StatCard label="Complets" val={stats.withLinks} icon={<Eye className="text-emerald-400" />} />
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10">
        {/* FORMULAIRE COMPLET */}
        <aside className="lg:col-span-5">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2.5rem] shadow-2xl sticky top-8">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3 italic">
              {editingId ? 'MODIFIER PROJET' : 'NOUVEAU PROJET'}
            </h2>

            <div className="space-y-5">
              <input
                placeholder="Nom du projet"
                className="w-full p-4 rounded-2xl bg-slate-800/30 border border-white/5 outline-none focus:border-blue-500/50 transition-all font-bold"
                value={form.title || ''}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />

              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black ml-1">Description</p>
                <TiptapEditor
                  key={editingId || 'new'}
                  value={form.description || ''}
                  onChange={(html) => setForm({ ...form, description: html })}
                />
              </div>

              {/* REPO & DEMO LINKS */}
              <div className="grid grid-cols-1 gap-3">
                <div className="relative group">
                  <Globe size={18} className="absolute left-4 top-4 text-slate-600 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    placeholder="Lien Démo (https://...)"
                    className="w-full pl-12 p-4 rounded-2xl bg-slate-800/30 border border-white/5 outline-none text-sm"
                    value={form.demo_link || ''}
                    onChange={e => setForm({ ...form, demo_link: e.target.value })}
                  />
                </div>
                <div className="relative group">
                  <Github size={18} className="absolute left-4 top-4 text-slate-600 group-focus-within:text-white transition-colors" />
                  <input
                    placeholder="Lien Repository GitHub"
                    className="w-full pl-12 p-4 rounded-2xl bg-slate-800/30 border border-white/5 outline-none text-sm"
                    value={form.repository_link || ''}
                    onChange={e => setForm({ ...form, repository_link: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 p-4 rounded-2xl bg-blue-500/5 border-2 border-dashed border-blue-500/20 text-blue-400 cursor-pointer hover:bg-blue-500/10 transition-all">
                  <ImageIcon size={20} />
                  <span className="text-sm font-bold truncate">{selectedFile ? selectedFile.name : 'Image du projet'}</span>
                  <input type="file" className="hidden" accept="image/*" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
                </label>

                <label className="flex gap-3 items-center p-4 rounded-2xl bg-slate-800/30 border border-white/5 cursor-pointer select-none group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded-lg border-slate-700 bg-slate-800 text-blue-500 focus:ring-offset-0 focus:ring-0"
                    checked={form.is_pinned || false}
                    onChange={e => setForm({ ...form, is_pinned: e.target.checked })}
                  />
                  <span className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors uppercase tracking-tighter italic">Épingler ce projet</span>
                </label>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black ml-1">Statut du projet</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setForm({ ...form, status: key })}
                      className={`px-3 py-2 rounded-xl border text-[10px] font-bold transition-all duration-300 ${form.status === key
                          ? `${config.color} ring-2 ring-white/5`
                          : 'border-white/5 bg-white/5 text-slate-500 hover:border-white/20'
                        }`}
                    >
                      {config.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={submit}
                disabled={loading}
                className="w-full bg-linear-to-r from-blue-600 to-indigo-600 py-4 rounded-2xl font-black shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {loading ? <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" /> : <><Save size={20} /> {editingId ? 'METTRE À JOUR' : 'PUBLIER'}</>}
              </button>
              {editingId && <button onClick={cancelEdit} className="w-full text-xs text-slate-600 hover:text-white transition-colors font-bold uppercase tracking-widest">Annuler la modification</button>}
            </div>
          </div>
        </aside>

        {/* LISTE AVEC COMPONENT AdminProjectCard */}
        <main className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 italic">Tes Réalisations</h3>
          </div>
          <AnimatePresence mode="popLayout">
            {data.map((project: any) => (
              <AdminProjectCard
                key={project.id}
                project={project}
                onEdit={() => {
                  setEditingId(project.id)
                  setForm(project)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                onDelete={() => {
                  if (confirm('Supprimer ce projet ?')) {
                    achievementsService.delete(project.id).then(refresh)
                  }
                }}
              />
            ))}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

function StatCard({ label, val, icon }: any) {
  return (
    <div className="bg-slate-900/40 border border-white/5 p-6 rounded-4xl flex items-center justify-between group hover:border-blue-500/20 transition-all cursor-default">
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black italic">{label}</p>
        <p className="text-4xl font-black mt-2 bg-clip-text text-transparent bg-linear-to-b from-white to-slate-500">{val}</p>
      </div>
      <div className="w-14 h-14 bg-black/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">{icon}</div>
    </div>
  )
}