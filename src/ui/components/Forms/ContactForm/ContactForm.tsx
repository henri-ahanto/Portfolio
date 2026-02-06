'use client'

import { useState } from 'react'
import { supabase } from '@/domain/services/supabaseClient'

export const ContactForm = () => {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    await supabase.from('messages').insert({
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    })

    setLoading(false)
    setSent(true)
    form.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input name="name" placeholder="Nom" className="p-3 border rounded" required />
      <input name="email" placeholder="Email" className="p-3 border rounded" required />
      <textarea name="message" placeholder="Message" className="p-3 border rounded" rows={4} required />
      <button disabled={loading} className="bg-purple-600 text-white py-3 rounded">
        {sent ? 'Envoyé ✅' : 'Envoyer'}
      </button>
    </form>
  )
}
