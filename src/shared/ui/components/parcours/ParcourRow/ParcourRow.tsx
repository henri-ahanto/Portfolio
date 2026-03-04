'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Edit2, Trash2, Check, X, MapPin, Calendar, Pin } from 'lucide-react'
import { Parcours } from '@/shared/entities/types/parcour.type'

interface ParcourRowProps {
  item: Parcours
  onSave: (id: string, payload: any) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function ParcourRow({ item, onSave, onDelete }: ParcourRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    title: item.title,
    company: item.company || '',
    location: item.location || '',
    description: item.description || '',
    start_date: item.start_date ? new Date(item.start_date).toISOString().split('T')[0] : '',
    end_date: item.end_date ? new Date(item.end_date).toISOString().split('T')[0] : '',
    is_pinned: item.is_pinned || false,
  })

  const handleSave = async () => {
    await onSave(item.id, {
      ...editForm,
      start_date: editForm.start_date ? new Date(editForm.start_date) : null,
      end_date: editForm.end_date ? new Date(editForm.end_date) : null,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm({
      title: item.title,
      company: item.company || '',
      location: item.location || '',
      description: item.description || '',
      start_date: item.start_date ? new Date(item.start_date).toISOString().split('T')[0] : '',
      end_date: item.end_date ? new Date(item.end_date).toISOString().split('T')[0] : '',
      is_pinned: item.is_pinned || false,
    })
    setIsEditing(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2.5rem] shadow-2xl hover:border-amber-500/20 transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-500/10 rounded-xl">
              <Briefcase className="text-amber-500" size={18} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{item.title}</h3>
                {item.is_pinned && (
                  <Pin className="text-amber-500" size={16} />
                )}
              </div>
              <p className="text-slate-400 text-sm">{item.company}</p>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50"
                placeholder="Poste"
              />
              <input
                type="text"
                value={editForm.company}
                onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50"
                placeholder="Entreprise"
              />
              <input
                type="text"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50"
                placeholder="Lieu"
              />
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50 resize-none"
                rows={3}
                placeholder="Description"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={editForm.start_date}
                  onChange={(e) => setEditForm({ ...editForm, start_date: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50"
                />
                <input
                  type="date"
                  value={editForm.end_date}
                  onChange={(e) => setEditForm({ ...editForm, end_date: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50"
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editForm.is_pinned}
                  onChange={(e) => setEditForm({ ...editForm, is_pinned: e.target.checked })}
                  className="w-4 h-4 bg-slate-800/50 border border-white/5 rounded outline-none focus:border-amber-500/50"
                />
                <span className="text-slate-300">Épingler</span>
              </label>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-4 text-slate-400 text-sm mb-2">
                {item.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{item.location}</span>
                  </div>
                )}
                {item.start_date && (
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>
                      {formatDate(item.start_date)}
                      {item.end_date && ` - ${formatDate(item.end_date)}`}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {item.description || 'Aucune description'}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-2 bg-amber-500/10 text-amber-500 rounded-xl hover:bg-amber-500/20 transition-colors"
                title="Sauvegarder"
              >
                <Check size={16} />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"
                title="Annuler"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500/20 transition-colors"
              title="Modifier"
            >
              <Edit2 size={16} />
            </button>
          )}
          
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"
            title="Supprimer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
