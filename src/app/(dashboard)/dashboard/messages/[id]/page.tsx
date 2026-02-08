'use client'
import { supabase } from '@/domain/services/supabaseClient'
import { ArrowLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import router from 'next/router'
import { useEffect, useState } from 'react'
// ... imports supabase, Lucide icons

export default function MessageDetailPage() {
    const { id } = useParams()
    const [message, setMessage] = useState<any>(null)

    useEffect(() => {
        const fetchMessage = async () => {
            const { data } = await supabase.from('messages').select('*').eq('id', id).single()
            if (data) {
                setMessage(data)
                // Marquer comme lu automatiquement à l'ouverture
                await supabase.from('messages').update({ is_read: true }).eq('id', id)
            }
        }
        fetchMessage()
    }, [id])

    if (!message) return <div className="p-20 text-center text-slate-500">Chargement...</div>

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors uppercase font-black italic text-xs">
                <ArrowLeft size={16} /> Retour à la liste
            </button>

            <div className="bg-slate-900/40 border border-white/5 p-10 rounded-[3rem] backdrop-blur-xl">
                <div className="border-b border-white/5 pb-8 mb-8 space-y-4">
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                        {message.subject}
                    </h1>
                    <div className="flex gap-4">
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold">{message.fullname}</span>
                        <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-lg text-xs font-bold">{message.email}</span>
                    </div>
                </div>

                {/* Rendu TipTap complet */}
                <div
                    className="prose prose-invert prose-blue max-w-none"
                    dangerouslySetInnerHTML={{ __html: message.message }}
                />
            </div>
        </div>
    )
}