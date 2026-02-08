'use client'

import { useMessages } from '@/domain/hooks/useMessages/useMessages'
import { messagesService } from '@/domain/services/messages.service'
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
            data.map((m, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                key={m.id}
                className={`group relative p-6 rounded-4xl border transition-all duration-300 ${
                  !m.is_read 
                    ? 'bg-slate-900/60 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.05)]' 
                    : 'bg-slate-900/20 border-white/5 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  {/* Contenu du message */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-xl border border-white/5">
                        <User size={14} className="text-emerald-400" />
                        <span className="text-sm font-bold text-white">{m.name}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-xl border border-white/5">
                        <AtSign size={14} className="text-slate-500" />
                        <span className="text-sm text-slate-400">{m.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 text-xs italic">
                        <Clock size={12} />
                        <span>Récemment reçu</span>
                      </div>
                    </div>

                    <div className="relative pl-4 border-l-2 border-slate-800 group-hover:border-emerald-500/50 transition-colors">
                       <MessageSquare size={16} className="absolute -left-[9px] -top-1 text-slate-800 bg-[#050508] group-hover:text-emerald-500 transition-colors" />
                       <p className="text-slate-300 leading-relaxed text-base">
                         {m.message}
                       </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col gap-2 shrink-0 self-end md:self-center">
                    {!m.is_read ? (
                      <button
                        onClick={() => markRead(m.id)}
                        className="p-4 rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                        title="Marquer comme lu"
                      >
                        <CheckCheck size={20} />
                        <span className="md:hidden font-bold">Lu</span>
                      </button>
                    ) : (
                      <div className="p-4 rounded-2xl bg-slate-800/50 text-slate-500 border border-white/5 flex items-center justify-center">
                        <MailOpen size={20} />
                      </div>
                    )}
                    
                    <button 
                      onClick={() => remove(m.id)}
                      className="p-4 rounded-2xl bg-slate-800/50 hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-all border border-white/5"
                      title="Supprimer"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Indicateur visuel pour message non lu */}
                {!m.is_read && (
                  <div className="absolute top-6 right-6 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />
                )}
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem]"
            >
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-slate-700" size={32} />
              </div>
              <p className="text-slate-500 font-medium">Votre boîte de réception est vide.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}