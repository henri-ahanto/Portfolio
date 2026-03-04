'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Layers, Plus } from 'lucide-react'

interface StackCreateFormProps {
  onCreate: (payload: {
    name: string
    category?: string
    level?: string
    description?: string
  }) => Promise<void>
}

export function StackCreateForm({ onCreate }: StackCreateFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    level: '',
    description: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) return

    setIsSubmitting(true)
    try {
      await onCreate(formData)
      setFormData({
        name: '',
        category: '',
        level: '',
        description: '',
      })
    } catch (error) {
      console.error('Failed to create stack:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Nom de la technologie"
          className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50 placeholder-slate-500"
          required
        />
      </div>

      <div>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="Catégorie (ex: Frontend, Backend, Database)"
          className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50 placeholder-slate-500"
        />
      </div>

      <div>
        <select
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
          className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50 placeholder-slate-500"
        >
          <option value="">Sélectionner un niveau</option>
          <option value="beginner">Débutant</option>
          <option value="intermediate">Intermédiaire</option>
          <option value="advanced">Avancé</option>
          <option value="expert">Expert</option>
        </select>
      </div>

      <div>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Description (optionnel)"
          rows={4}
          className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50 placeholder-slate-500 resize-none"
        />
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting || !formData.name}
        className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Plus size={18} />
            Ajouter la technologie
          </>
        )}
      </motion.button>
    </form>
  )
}
