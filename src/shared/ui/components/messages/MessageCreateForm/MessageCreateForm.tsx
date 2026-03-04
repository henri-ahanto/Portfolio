'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Plus } from 'lucide-react'

interface MessageCreateFormProps {
  onCreate: (payload: {
    fullname: string
    email: string
    subject: string
    message?: string
  }) => Promise<void>
}

export function MessageCreateForm({ onCreate }: MessageCreateFormProps) {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullname || !formData.email || !formData.subject) return

    setIsSubmitting(true)
    try {
      await onCreate(formData)
      setFormData({ fullname: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Failed to create message:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={formData.fullname}
          onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
          placeholder="Nom complet"
          className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50 placeholder-slate-500"
          required
        />
      </div>

      <div>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50 placeholder-slate-500"
          required
        />
      </div>

      <div>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="Sujet"
          className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50 placeholder-slate-500"
          required
        />
      </div>

      <div>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Message (optionnel)"
          rows={4}
          className="w-full px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl outline-none transition-all focus:border-amber-500/50 placeholder-slate-500 resize-none"
        />
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting || !formData.fullname || !formData.email || !formData.subject}
        className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Plus size={18} />
            Créer le message
          </>
        )}
      </motion.button>
    </form>
  )
}
