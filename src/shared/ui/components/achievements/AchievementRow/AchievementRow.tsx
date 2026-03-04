'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Edit2, Trash2, Check, X, ExternalLink, Github, Star, Pin } from 'lucide-react'
import { Achievement } from '@/shared/entities/types/achievement.type'

interface AchievementRowProps {
  item: Achievement
  onSave: (id: string, payload: any) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function AchievementRow({ item, onSave, onDelete }: AchievementRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    title: item.title,
    description: item.description || '',
    image_url: item.image_url || '',
    demo_link: item.demo_link || '',
    repository_link: item.repository_link || '',
    status: item.status || '',
    is_pinned: item.is_pinned || false,
  })

  const handleSave = async () => {
    await onSave(item.id, editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm({
      title: item.title,
      description: item.description || '',
      image_url: item.image_url || '',
      demo_link: item.demo_link || '',
      repository_link: item.repository_link || '',
      status: item.status || '',
      is_pinned: item.is_pinned || false,
    })
    setIsEditing(false)
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
              <Trophy className="text-amber-500" size={18} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{item.title}</h3>
                {item.is_pinned && (
                  <Pin className="text-amber-500" size={16} />
                )}
              </div>
              <p className="text-slate-400 text-sm">{item.status}</p>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50"
                placeholder="Titre"
              />
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50 resize-none"
                rows={3}
                placeholder="Description"
              />
              <input
                type="url"
                value={editForm.image_url}
                onChange={(e) => setEditForm({ ...editForm, image_url: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50"
                placeholder="URL de l'image"
              />
              <input
                type="url"
                value={editForm.demo_link}
                onChange={(e) => setEditForm({ ...editForm, demo_link: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50"
                placeholder="Lien de démo"
              />
              <input
                type="url"
                value={editForm.repository_link}
                onChange={(e) => setEditForm({ ...editForm, repository_link: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50"
                placeholder="Lien du repository"
              />
              <select
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50"
              >
                <option value="">Sélectionner un statut</option>
                <option value="completed">Terminé</option>
                <option value="in_progress">En cours</option>
                <option value="planned">Planifié</option>
              </select>
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
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                {item.description || 'Aucune description'}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.demo_link && (
                  <a
                    href={item.demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-500 rounded-lg text-sm hover:bg-blue-500/20 transition-colors"
                  >
                    <ExternalLink size={12} />
                    Demo
                  </a>
                )}
                {item.repository_link && (
                  <a
                    href={item.repository_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-500/10 text-gray-400 rounded-lg text-sm hover:bg-gray-500/20 transition-colors"
                  >
                    <Github size={12} />
                    Code
                  </a>
                )}
              </div>
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
