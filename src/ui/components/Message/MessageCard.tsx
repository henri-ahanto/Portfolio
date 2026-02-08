'use client'

import { motion } from 'framer-motion'
import { User, AtSign, Clock, MessageSquare, Trash2, MailOpen, Tag, CheckCheck, Eye } from 'lucide-react'
import Link from 'next/link'

type MessageCardProps = {
    message: {
        id: string
        fullname: string
        email: string
        subject: string
        message: string
        is_read: boolean
        created_at: string
    }
    onDelete?: (id: string) => void
    onRead?: (id: string) => void
}

export const MessageCard = ({ message, onDelete, onRead }: MessageCardProps) => {
    // Fonction pour extraire le texte brut du HTML de Tiptap pour l'aperçu
    const getPlainText = (html: string) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`group relative p-6 md:p-8 rounded-[2.5rem] border transition-all duration-500 ${!message.is_read
                ? 'bg-slate-900/60 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.05)]'
                : 'bg-slate-900/20 border-white/5 opacity-80 hover:opacity-100'
                }`}
        >
            {/* Indicateur visuel flottant pour non-lus */}
            {!message.is_read && (
                <div className="absolute top-8 right-8 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_15px_#10b981]"></span>
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="flex-1 space-y-5">
                    {/* Header : Expéditeur & Meta */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-xl border border-white/5">
                            <User size={14} className="text-emerald-400" />
                            <span className="text-xs font-black uppercase italic tracking-tighter text-white">
                                {message.fullname}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-xl border border-white/5">
                            <AtSign size={14} className="text-slate-500" />
                            <span className="text-xs font-bold text-slate-400">{message.email}</span>
                        </div>
                        <div className="hidden lg:flex items-center gap-2 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] ml-auto">
                            <Clock size={12} />
                            <span>{new Date(message.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {/* Sujet & Bouton Voir */}
                    <div className="flex items-center justify-between gap-3 px-1">
                        <div className="flex items-center gap-3">
                            <Tag size={14} className="text-emerald-500/50" />
                            <h4 className="text-sm font-bold text-slate-200 uppercase italic tracking-tight">
                                {message.subject}
                            </h4>
                        </div>

                        {/* Lien vers la page complète */}
                        <Link
                            href={`/dashboard/messages/${message.id}`}
                            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors group/link"
                        >
                            Détails <Eye size={14} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Aperçu du message (Tronqué) */}
                    <div className="relative pl-6 py-1 border-l border-slate-800 group-hover:border-emerald-500/50 transition-colors">
                        <MessageSquare size={14} className="absolute -left-[7.5px] -top-1 text-slate-800 bg-[#050508] p-0.5 group-hover:text-emerald-500 transition-colors" />
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 italic">
                            "{getPlainText(message.message)}"
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-3 shrink-0 self-end md:self-center">
                    {!message.is_read ? (
                        <button
                            onClick={async () => await onRead?.(message.id)}
                            className="p-4 rounded-2xl bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                        >
                            <CheckCheck size={20} strokeWidth={3} />
                        </button>
                    ) : (
                        <div className="p-4 rounded-2xl bg-slate-800/30 text-slate-600 border border-white/5 flex items-center justify-center">
                            <MailOpen size={20} />
                        </div>
                    )}

                    <button
                        onClick={async () => await onDelete?.(message.id)}
                        className="p-4 rounded-2xl bg-slate-800/30 hover:bg-red-500/10 text-slate-600 hover:text-red-400 transition-all border border-white/5"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}