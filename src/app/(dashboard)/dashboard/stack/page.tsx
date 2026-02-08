'use client'

import { useStacks } from '@/domain/hooks/useStacks/useStacks'
import { stacksService } from '@/domain/services/stacks.service'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Trash2,
  Layers,
  CloudUpload,
  Zap,
  Info,
  Box
} from 'lucide-react'

export default function StackAdminPage() {
  const { data = [], refresh } = useStacks()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!name || !description || !image) return
    setLoading(true)
    try {
      await stacksService.create({ name, description, image })
      setName('')
      setDescription('')
      setImage(null)
      refresh()
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: string) => {
    if (!confirm('Supprimer ce stack ?')) return
    await stacksService.delete(id)
    refresh()
  }

  return (
    <div className="max-w-7xl mx-auto min-h-screen text-slate-200">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-purple-500 flex items-center gap-3">
          <Zap className="text-indigo-500" /> Ma Stack Technique
        </h1>
        <p className="text-slate-500 mt-2">Gérez les outils et technologies que vous maîtrisez.</p>
      </header>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Formulaire - Style Glassmorphism Indigo */}
        <aside className="lg:col-span-4">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden top-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <Plus className="text-indigo-400" size={20} /> Ajouter un outil
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 ml-1">Nom de la Technologie</label>
                <input
                  placeholder="Ex: Next.js, Framer Motion..."
                  className="w-full p-3 rounded-xl bg-slate-800/50 border border-white/5 outline-none focus:ring-1 ring-indigo-500/50 transition"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 ml-1">Description courte</label>
                <textarea
                  placeholder="Usage principal..."
                  rows={2}
                  className="w-full p-3 rounded-xl bg-slate-800/50 border border-white/5 outline-none focus:ring-1 ring-indigo-500/50 transition resize-none text-sm"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 ml-1">Logo / Icône</label>
                <label className="flex flex-col items-center justify-center w-full h-32 rounded-2xl border-2 border-dashed border-white/10 bg-slate-800/20 hover:bg-indigo-500/5 hover:border-indigo-500/50 transition cursor-pointer group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <CloudUpload className="text-slate-500 group-hover:text-indigo-400 mb-2 transition-colors" />
                    <p className="text-xs text-slate-500 group-hover:text-indigo-300">
                      {image ? image.name : 'Cliquez pour uploader'}
                    </p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} />
                </label>
              </div>

              <button
                onClick={submit}
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 font-bold shadow-lg shadow-indigo-900/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <> <Layers size={18} /> Enregistrer l'outil </>
                )}
              </button>
            </div>
          </div>
        </aside>

        {/* Liste des Stacks */}
        <main className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-6 px-2 text-slate-500">
            <Box size={18} />
            <h2 className="text-sm font-bold uppercase tracking-widest">Technologies Actuelles ({data.length})</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {data.map((s, index) => (
                <motion.div
                  key={s.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative flex items-center gap-4 bg-slate-900/30 border border-white/5 p-4 rounded-3xl hover:bg-slate-900/50 hover:border-indigo-500/30 transition-all duration-300"
                >
                  {/* Icon Area */}
                  <div className="w-16 h-16 shrink-0 rounded-2xl dark:bg-white/5 flex items-center justify-center shadow-inner border border-black/5 dark:border-white/10 overflow-hidden group-hover:scale-110 transition-transform">
                    <img
                      src={s.logo_url}
                      alt={s.name}
                      className="w-10 h-10 object-contain"
                    />

                    <div className='w-16 h-16 bg-white/10 blur-lg absolute'></div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-bold text-white truncate">{s.name}</p>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => remove(s.id)}
                    className="p-3 rounded-xl bg-slate-800/50 hover:bg-red-500/20 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* Subtle Glow behind icon */}
                  <div className="absolute -left-2 -top-2 w-16 h-16 bg-indigo-500/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {data.length === 0 && !loading && (
            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem] text-slate-600">
              Aucune technologie ajoutée
            </div>
          )}
        </main>
      </div>
    </div>
  )
}