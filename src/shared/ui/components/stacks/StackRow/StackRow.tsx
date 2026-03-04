'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Layers, Edit2, Trash2, Check, X, Zap } from 'lucide-react'
import { Stack } from '@/shared/entities/types/stack.type'

interface StackRowProps {
  item: Stack
  onSave: (id: string, payload: any) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function StackRow({ item, onSave, onDelete }: StackRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: item.name,
    category: item.category || '',
    level: item.level || '',
    description: item.description || '',
  })

  const handleSave = async () => {
    await onSave(item.id, editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm({
      name: item.name,
      category: item.category || '',
      level: item.level || '',
      description: item.description || '',
    })
    setIsEditing(false)
  }

  const getLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'expert':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
      case 'advanced':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'intermediate':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'beginner':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20'
    }
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
              <Layers className="text-amber-500" size={18} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">{item.name}</h3>
              <p className="text-slate-400 text-sm">{item.category}</p>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50"
                placeholder="Nom de la technologie"
              />
              <input
                type="text"
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50"
                placeholder="Catégorie"
              />
              <select
                value={editForm.level}
                onChange={(e) => setEditForm({ ...editForm, level: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50"
              >
                <option value="">Sélectionner un niveau</option>
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
                <option value="expert">Expert</option>
              </select>
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50 resize-none"
                rows={3}
                placeholder="Description"
              />
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-2">
                {item.level && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(item.level)}`}>
                    {item.level}
                  </span>
                )}
                {item.category && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600/50">
                    {item.category}
                  </span>
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
