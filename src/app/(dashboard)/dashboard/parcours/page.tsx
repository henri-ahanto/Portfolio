'use client'

import { useParcours } from '@/domain/hooks/useParcours/useParcours'
import { useState } from 'react'
import { parcoursService } from '@/domain/services/parcours.service'
import { CourseCard } from '@/ui/components/cards/CourseCard/CourseCard'
import Course from '@/domain/entities/Course'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Trash2, Edit3, Save, X,
  MapPin, Calendar, Tag, Briefcase,
  Search, Pin
} from 'lucide-react'
import { TiptapEditor } from '@/ui/components/TipTap/TipTapEditor'

export default function ParcoursAdminPage() {
  const { data = [], refresh } = useParcours()
  const [form, setForm] = useState<Partial<Course> | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = data.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const submit = async () => {
    if (editingId) {
      await parcoursService.update(editingId, form)
    } else {
      await parcoursService.create(form)
    }
    cancelEdit()
    refresh()
  }

  const cancelEdit = () => {
    setForm(null)
    setEditingId(null)
  }

  const remove = async (id: string) => {
    if (confirm("Supprimer cette étape du parcours ?")) {
      await parcoursService.delete(id)
      refresh()
    }
  }

  return (
    <div className="min-h-screen bg-[#050508] text-slate-200">
      {/* Header avec Statistiques rapides */}
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-emerald-400">
            Expériences & Études
          </h1>
          <p className="text-slate-500 mt-1">Gérez votre ligne du temps professionnelle</p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-white/5 rounded-xl focus:border-blue-500/50 outline-none transition"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-8 items-start">

        {/* Formulaire - Style Glassmorphism */}
        <aside className="lg:col-span-4 sticky top-8">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-2xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              {editingId ? <Edit3 className="text-emerald-400" /> : <Plus className="text-blue-400" />}
              {editingId ? 'Modifier l\'étape' : 'Ajouter une étape'}
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 ml-1">Intitulé</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3.5 text-slate-600" size={16} />
                  <input
                    placeholder="Ex: Lead Developer"
                    className="w-full pl-10 p-3 rounded-xl bg-slate-800/50 border border-white/5 outline-none focus:ring-1 ring-blue-500/50 transition"
                    value={form?.title || ''}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 ml-1">Période</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 text-slate-600" size={16} />
                    <input
                      placeholder="2023 - Présent"
                      className="w-full pl-10 p-3 rounded-xl bg-slate-800/50 border border-white/5 outline-none text-sm"
                      value={form?.period || ''}
                      onChange={e => setForm({ ...form, period: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 ml-1">Lieu</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 text-slate-600" size={16} />
                    <input
                      placeholder="Paris, FR"
                      className="w-full pl-10 p-3 rounded-xl bg-slate-800/50 border border-white/5 outline-none text-sm"
                      value={form?.location || ''}
                      onChange={e => setForm({ ...form, location: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 ml-1">Description</label>
                <TiptapEditor
                  key={editingId || 'new'}
                  value={form?.description || ''}
                  onChange={(html) => setForm({ ...form, description: html })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 ml-1">Compétences (Tags)</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3.5 text-slate-600" size={16} />
                  <input
                    placeholder="React, Node, UI/UX (séparés par des virgules)"
                    className="w-full pl-10 p-3 rounded-xl bg-slate-800/50 border border-white/5 outline-none text-sm"
                    value={form?.tags?.join(',') || ''}
                    onChange={e => setForm({ ...form, tags: e.target.value.split(',') })}
                  />
                </div>
              </div>

              <label className="flex gap-3 items-center p-3 rounded-xl bg-slate-800/30 border border-white/5 cursor-pointer hover:bg-slate-800/50 transition group">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition ${form?.is_pinned ? 'bg-blue-600 border-blue-400' : 'border-slate-700 bg-slate-900'}`}>
                  {form?.is_pinned && <Pin size={12} className="text-white" />}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={form?.is_pinned || false}
                  onChange={e => setForm({ ...form, is_pinned: e.target.checked })}
                />
                <span className="text-sm font-medium text-slate-400 group-hover:text-slate-200">Épingler sur l'accueil</span>
              </label>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={submit}
                  className="flex-1 bg-linear-to-r from-blue-600 to-emerald-600 hover:scale-[1.02] active:scale-95 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  {editingId ? 'Mettre à jour' : 'Enregistrer'}
                </button>
                {editingId && (
                  <button onClick={cancelEdit} className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition">
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Liste avec prévisualisation des cartes */}
        <main className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredData.map((p, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                key={p.id}
                className="group relative flex flex-col md:flex-row gap-4 items-center bg-slate-900/20 border border-white/5 p-2 rounded-4xl hover:bg-slate-900/40 transition-all"
              >
                <div className="flex-1 w-full">
                  <CourseCard
                    title={p.title}
                    description={p.description}
                    period={p.period}
                    location={p.location}
                    tags={p.tags}
                  />
                </div>

                <div className="flex md:flex-col gap-2 p-4">
                  <button
                    onClick={() => {
                      setEditingId(p.id)
                      setForm(p)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="p-3 rounded-2xl bg-slate-800 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 transition-all"
                    title="Modifier"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => remove(p.id)}
                    className="p-3 rounded-2xl bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all"
                    title="Supprimer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {p.is_pinned && (
                  <div className="absolute -top-2 -left-2 bg-blue-600 p-1.5 rounded-lg shadow-lg -rotate-12">
                    <Pin size={14} className="text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredData.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl text-slate-600">
              Aucun parcours trouvé
            </div>
          )}
        </main>
      </div>
    </div>
  )
}