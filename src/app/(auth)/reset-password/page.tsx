'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setError(error.message)
    } else {
      alert('✅ Mot de passe mis à jour')
      router.push('/login')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#060517] text-white">
      <form
        onSubmit={handleReset}
        className="w-full max-w-sm space-y-6 bg-[#0b0a1f] p-8 rounded-xl shadow-xl"
      >
        <h1 className="text-2xl font-bold text-center">Nouveau mot de passe</h1>

        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded bg-[#15143a]"
          required
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded bg-linear-to-r from-indigo-500 to-purple-500 font-semibold"
        >
          {loading ? 'Enregistrement...' : 'Valider'}
        </button>
      </form>
    </main>
  )
}
