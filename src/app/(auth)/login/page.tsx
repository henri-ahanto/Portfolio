'use client'

import { useState } from 'react'
import { useAuth } from '@/domain/hooks/useAuth/useAuth'

export default function LoginPage() {
  const { login, resetPassword } = useAuth()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(password)
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    try {
      await resetPassword()
      alert('📩 Email de réinitialisation envoyé')
    } catch (err: any) {
      alert(err.message || 'Erreur')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#060517] text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 bg-[#0b0a1f] p-8 rounded-xl shadow-xl"
      >
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded bg-[#15143a] focus:outline-none"
          required
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded bg-linear-to-r from-indigo-500 to-purple-500 font-semibold hover:opacity-90 transition"
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="block w-full text-sm text-center text-gray-400 hover:text-white"
        >
          Mot de passe oublié ?
        </button>
      </form>
    </main>
  )
}
