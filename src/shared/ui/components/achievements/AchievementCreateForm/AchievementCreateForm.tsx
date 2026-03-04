'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

interface AchievementCreateFormProps {
  onCreate: (payload: {
    title: string
    description?: string
    image_url?: string
    demo_link?: string
    repository_link?: string
    status?: string
    is_pinned?: boolean
  }) => Promise<void>
}

export function AchievementCreateForm({ onCreate }: AchievementCreateFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    demo_link: '',
    repository_link: '',
    status: '',
    is_pinned: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) return

    setIsSubmitting(true)
    try {
      await onCreate(formData)
      setFormData({
        title: '',
        description: '',
        image_url: '',
        demo_link: '',
        repository_link: '',
        status: '',
        is_pinned: false,
      })
    } catch (error) {
      console.error('Failed to create achievement:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Titre du projet"
          className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50 placeholder-slate-500"
          required
        />
      </div>

      <div>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Description du projet"
          rows={4}
          className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50 placeholder-slate-500 resize-none"
        />
      </div>

      <div>
        <input
          type="url"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          placeholder="URL de l'image (optionnel)"
          className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50 placeholder-slate-500"
        />
      </div>

      <div>
        <input
          type="url"
          value={formData.demo_link}
          onChange={(e) => setFormData({ ...formData, demo_link: e.target.value })}
          placeholder="Lien de démo (optionnel)"
          className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50 placeholder-slate-500"
        />
      </div>

      <div>
        <input
          type="url"
          value={formData.repository_link}
          onChange={(e) => setFormData({ ...formData, repository_link: e.target.value })}
          placeholder="Lien du repository (optionnel)"
          className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50 placeholder-slate-500"
        />
      </div>

      <div>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50 placeholder-slate-500"
        >
          <option value="">Sélectionner un statut</option>
          <option value="completed">Terminé</option>
          <option value="in_progress">En cours</option>
          <option value="planned">Planifié</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.is_pinned}
            onChange={(e) => setFormData({ ...formData, is_pinned: e.target.checked })}
            className="w-4 h-4 bg-slate-800/50 border border-white/5 rounded outline-none focus:border-amber-500/50"
          />
          <span className="text-slate-300">Épingler ce projet</span>
        </label>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting || !formData.title}
        className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Plus size={18} />
            Créer le projet
          </>
        )}
      </motion.button>
    </form>
  )
}
