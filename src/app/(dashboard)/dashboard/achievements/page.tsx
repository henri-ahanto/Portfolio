'use client'

import { useAchievements } from '@/domain/hooks/useAchievements/useAchievements'
import { achievementsService } from '@/domain/services/achievements.service'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Trash2, Edit3, Globe, Github, 
  Image as ImageIcon,  Save, 
} from 'lucide-react'

export default function AchievementsAdminPage() {
  const { data = [], refresh } = useAchievements()
  const [form, setForm] = useState<any>({ is_pinned: false })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(true)
    try {
      if (editingId) {
        // En cas de mise à jour, on envoie les données directement
        // Note: Si tu veux changer l'image en édition, il faudrait ajouter une logique d'upload ici aussi
        await achievementsService.update(editingId, form)
      } else {
        // Création avec le nouveau service qui gère l'upload
        if (!selectedFile) {
          alert("Veuillez sélectionner une image pour le nouveau projet.")
          setLoading(false)
          return
        }

        await achievementsService.create({
          title: form.title,
          description: form.description,
          image: selectedFile,
          demo_link: form.demo_link,
          repositoty_link: form.repositoty_link,
          is_pinned: form.is_pinned
        })
      }
      cancelEdit()
      refresh()
    } catch (e) {
      console.error("Erreur lors de la sauvegarde:", e)
    } finally {
      setLoading(false)
    }
  }

  const cancelEdit = () => {
    setForm({ is_pinned: false })
    setEditingId(null)
    setSelectedFile(null)
  }

  const remove = async (id: string) => {
    if (confirm('Supprimer ce projet ?')) {
      await achievementsService.delete(id)
      refresh()
    }
  }

  return (
    <div className="min-h-screen bg-[#050508] text-slate-200 p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-violet-500">
            Portfolio Admin
          </h1>
          <p className="text-slate-500 mt-2">Gérez vos réalisations et projets</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-8 bg-slate-900/50 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-2xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              {editingId ? <Edit3 size={20} className="text-violet-400" /> : <Plus size={20} className="text-blue-400" />}
              {editingId ? 'Modifier le projet' : 'Nouveau Projet'}
            </h2>

            <div className="space-y-4">
              <input
                placeholder="Titre du projet"
                className="w-full p-3 rounded-xl bg-slate-800/50 border border-white/5 outline-none"
                value={form.title || ''}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />

              <textarea
                placeholder="Description..."
                rows={3}
                className="w-full p-3 rounded-xl bg-slate-800/50 border border-white/5 outline-none"
                value={form.description || ''}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />

              {/* Upload Input Style Deep Night */}
              {!editingId && (
                <div className="space-y-1">
                  <label className="flex items-center justify-center w-full p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 cursor-pointer hover:bg-blue-500/20 transition">
                    <ImageIcon size={18} className="mr-2" />
                    <span className="text-sm font-medium">
                      {selectedFile ? selectedFile.name.substring(0, 15) + '...' : 'Choisir une image'}
                    </span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={e => setSelectedFile(e.target.files?.[0] || null)} 
                    />
                  </label>
                </div>
              )}

              <div className="space-y-3">
                <div className="relative">
                   <Globe size={16} className="absolute left-3 top-3.5 text-slate-500" />
                   <input
                    placeholder="Lien démo"
                    className="w-full pl-10 p-3 rounded-xl bg-slate-800/50 border border-white/5 outline-none text-sm"
                    value={form.demo_link || ''}
                    onChange={e => setForm({ ...form, demo_link: e.target.value })}
                  />
                </div>
                <div className="relative">
                   <Github size={16} className="absolute left-3 top-3.5 text-slate-500" />
                   <input
                    placeholder="Lien GitHub"
                    className="w-full pl-10 p-3 rounded-xl bg-slate-800/50 border border-white/5 outline-none text-sm"
                    value={form.repositoty_link || ''}
                    onChange={e => setForm({ ...form, repositoty_link: e.target.value })}
                  />
                </div>
              </div>

              <label className="flex gap-3 items-center p-3 rounded-xl bg-slate-800/30 border border-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-700 bg-slate-800"
                  checked={form.is_pinned || false}
                  onChange={e => setForm({ ...form, is_pinned: e.target.checked })}
                />
                <span className="text-sm font-medium text-slate-400">Épingler sur l'accueil</span>
              </label>

              <button 
                onClick={submit} 
                disabled={loading}
                className="w-full bg-linear-to-r from-blue-600 to-violet-600 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <><Save size={18} /> {editingId ? 'Mettre à jour' : 'Publier'}</>}
              </button>
              {editingId && <button onClick={cancelEdit} className="w-full p-2 text-xs text-slate-500 hover:text-white">Annuler</button>}
            </div>
          </div>
        </aside>

        <main className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {data.map((a: any) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={a.id}
                className="group bg-slate-900/30 border border-white/5 p-4 rounded-3xl flex justify-between items-center"
              >
                <div className="flex gap-4 items-center">
                  <img src={a.image_url} alt="" className="w-12 h-12 rounded-xl object-cover bg-slate-800" />
                  <div>
                    <h3 className="font-bold text-white">{a.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{a.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingId(a.id); setForm(a); }} className="p-2 text-slate-400 hover:text-blue-400 transition"><Edit3 size={18} /></button>
                  <button onClick={() => remove(a.id)} className="p-2 text-slate-400 hover:text-red-400 transition"><Trash2 size={18} /></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}