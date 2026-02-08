'use client'

import { useState } from 'react'
import { supabase } from '@/domain/services/supabaseClient'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { TiptapEditor } from '../../TipTap/TipTapEditor'

export const ContactForm = () => {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [messageHtml, setMessageHtml] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. On capture l'élément TOUT DE SUITE
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const { error: supabaseError } = await supabase.from('messages').insert({
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: messageHtml,
      });

      if (supabaseError) throw supabaseError;

      // 2. On utilise la variable "form" capturée plus haut
      setSent(true);
      form.reset(); // Plus d'erreur ici !
      setMessageHtml('');

      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setError("Une erreur est survenue lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-slate-900/40 border border-white/5 rounded-2xl px-6 py-4 text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-600 font-medium"

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 ml-4 italic">Nom Complet</label>
          <input name="fullname" placeholder="John Doe" className={inputClass} required />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 ml-4 italic">Email</label>
          <input name="email" type="email" placeholder="john@example.com" className={inputClass} required />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 ml-4 italic">Sujet</label>
        <input name="subject" placeholder="Collaboration, Projet..." className={inputClass} required />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 ml-4 italic">Message</label>
        <div className="rounded-4xl border border-white/5 bg-slate-900/40 backdrop-blur-xl overflow-hidden focus-within:border-blue-500/30 transition-all">
          <TiptapEditor
            value={messageHtml}
            onChange={(html) => setMessageHtml(html)}
          />
        </div>
      </div>

      <button
        disabled={loading || sent}
        className={`w-full py-5 rounded-4xl font-black uppercase tracking-widest italic flex items-center justify-center gap-3 transition-all duration-500 ${sent
            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20 hover:scale-[1.02]'
          }`}
      >
        {loading ? (
          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : sent ? (
          <> <CheckCircle size={20} /> Message Envoyé </>
        ) : (
          <> <Send size={20} /> Envoyer le message </>
        )}
      </button>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-400 text-xs font-bold justify-center"
          >
            <AlertCircle size={14} /> {error}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}