'use client'

import { useMessages } from '@/shared/hooks/useMessages/useMessages'
import { messagesService } from '@/shared/services/messages.service'
import { MessageCard } from '@/shared/ui/components/Message/MessageCard'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  MailOpen,
  Trash2,
  CheckCheck,
  User,
  AtSign,
  Clock,
  Inbox,
  MessageSquare
} from 'lucide-react'

export default function MessagesAdminPage() {
  const { data = [], refresh } = useMessages()

  const markRead = async (id: string) => {
    await messagesService.markRead(id)
    refresh()
  }

  const remove = async (id: string) => {
    if (confirm('Supprimer définitivement ce message ?')) {
      await messagesService.delete(id)
      refresh()
    }
  }

  // Calcul des stats rapides
  const unreadCount = data.filter(m => !m.is_read).length

  return (
    <div className="max-w-5xl mx-auto min-h-screen bg-[#050508] text-slate-200 py-5 px-6">
      {/* Header section */}
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-teal-400">
              Messages
            </h1>
            {unreadCount > 0 && (
              <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20 animate-pulse">
                {unreadCount} NOUVEAU(X)
              </span>
            )}
          </div>
          <p className="text-slate-500 mt-2 flex items-center gap-2">
            <Inbox size={16} /> Gérer les demandes de contact de votre portfolio
          </p>
        </div>
      </header>

      {/* Liste des messages */}
      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {data.length > 0 ? (
            data.map((msg) => (
              <MessageCard
                key={msg.id}
                message={msg}
                onDelete={remove}
                onRead={markRead}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 border border-dashed border-white/10 rounded-[3rem] bg-slate-900/10"
            >
              <div className="w-20 h-20 bg-slate-900 border border-white/5 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <MailOpen className="text-slate-700" size={32} />
              </div>
              <h3 className="text-white font-black italic uppercase tracking-tighter text-xl mb-2">Silence radio</h3>
              <p className="text-slate-500 font-medium text-sm">Votre boîte de réception est parfaitement propre.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}