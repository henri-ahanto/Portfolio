'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MailOpen, Edit2, Trash2, Check, X } from 'lucide-react'
import { Message } from '@/shared/entities/types/message.type'

interface MessageRowProps {
  item: Message
  onSave: (id: string, payload: any) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onMarkRead: (id: string) => Promise<void>
}

export function MessageRow({ item, onSave, onDelete, onMarkRead }: MessageRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    fullname: item.fullname,
    email: item.email,
    subject: item.subject,
    message: item.message || '',
  })

  const handleSave = async () => {
    await onSave(item.id, editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm({
      fullname: item.fullname,
      email: item.email,
      subject: item.subject,
      message: item.message || '',
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
              {item.is_read ? <MailOpen className="text-amber-500" size={18} /> : <Mail className="text-amber-500" size={18} />}
            </div>
            <div>
              <h3 className="font-semibold text-white">{item.fullname}</h3>
              <p className="text-slate-400 text-sm">{item.email}</p>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editForm.fullname}
                onChange={(e) => setEditForm({ ...editForm, fullname: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50"
                placeholder="Nom complet"
              />
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50"
                placeholder="Email"
              />
              <input
                type="text"
                value={editForm.subject}
                onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50"
                placeholder="Sujet"
              />
              <textarea
                value={editForm.message}
                onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl outline-none focus:border-amber-500/50 resize-none"
                rows={3}
                placeholder="Message"
              />
            </div>
          ) : (
            <div>
              <h4 className="font-medium text-white mb-2">{item.subject}</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {item.message || 'Aucun message'}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!item.is_read && (
            <button
              onClick={() => onMarkRead(item.id)}
              className="p-2 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500/20 transition-colors"
              title="Marquer comme lu"
            >
              <Check size={16} />
            </button>
          )}
          
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
