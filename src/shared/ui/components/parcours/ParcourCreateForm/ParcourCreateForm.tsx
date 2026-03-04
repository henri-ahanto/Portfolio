'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Plus } from 'lucide-react'

interface ParcourCreateFormProps {
  onCreate: (payload: {
    title: string
    company?: string
    location?: string
    description?: string
    start_date?: Date
    end_date?: Date
    is_pinned?: boolean
  }) => Promise<void>
}

export function ParcourCreateForm({ onCreate }: ParcourCreateFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    start_date: '',
    end_date: '',
    is_pinned: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) return

    setIsSubmitting(true)
    try {
      await onCreate({
        ...formData,
        start_date: formData.start_date ? new Date(formData.start_date) : undefined,
        end_date: formData.end_date ? new Date(formData.end_date) : undefined,
      })
      setFormData({
        title: '',
        company: '',
        location: '',
        description: '',
        start_date: '',
        end_date: '',
        is_pinned: false,
      })
    } catch (error) {
      console.error('Failed to create parcours:', error)
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
          placeholder="Poste ou titre"
          className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50 placeholder-slate-500"
          required
        />
      </div>

      <div>
        <input
          type="text"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          placeholder="Entreprise ou organisation"
          className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50 placeholder-slate-500"
        />
      </div>

      <div>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="Lieu (ville, pays)"
          className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50 placeholder-slate-500"
        />
      </div>

      <div>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Description du poste et des réalisations"
          rows={4}
          className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50 placeholder-slate-500 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-slate-400 text-sm mb-1">Date de début</label>
          <input
            type="date"
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50"
          />
        </div>
        <div>
          <label className="block text-slate-400 text-sm mb-1">Date de fin</label>
          <input
            type="date"
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.is_pinned}
            onChange={(e) => setFormData({ ...formData, is_pinned: e.target.checked })}
            className="w-4 h-4 bg-slate-800/50 border border-white/5 rounded outline-none focus:border-amber-500/50"
          />
          <span className="text-slate-300">Épingler cette expérience</span>
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
            Ajouter l'expérience
          </>
        )}
      </motion.button>
    </form>
  )
}
