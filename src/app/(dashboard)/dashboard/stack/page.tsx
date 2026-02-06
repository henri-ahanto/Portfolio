'use client'

import { useStacks } from '@/domain/hooks/useStacks/useStacks'
import { stacksService } from '@/domain/services/stacks.service'
import { useState } from 'react'

export default function StackAdminPage() {
  const { data, refresh } = useStacks()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!name || !description || !image) return
    setLoading(true)
    try {
      await stacksService.create({ name, description, image })
    } catch (e) {
      console.error(e)
    }
    setName('')
    setDescription('')
    setImage(null)
    refresh()
    setLoading(false)
  }

  const remove = async (id: string) => {
    if (!confirm('Supprimer ce stack ?')) return
    await stacksService.delete(id)
    refresh()
  }

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">🧠 Stacks</h1>

      {/* FORM */}
      <div className="bg-[#0b0a1f] border border-white/10 rounded-2xl p-6 grid md:grid-cols-3 gap-4 shadow-xl">
        <input
          placeholder="Nom du stack"
          className="p-3 rounded-lg bg-[#15143a] focus:ring-2 focus:ring-indigo-500 outline-none"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Description courte"
          className="p-3 rounded-lg bg-[#15143a] focus:ring-2 focus:ring-indigo-500 outline-none"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files?.[0] || null)}
          className="text-sm text-gray-400 file:bg-indigo-600 file:text-white file:border-none file:rounded-lg file:px-4 file:py-2 file:cursor-pointer"
        />

        <button
          onClick={submit}
          disabled={loading}
          className="md:col-span-3 h-[46px] rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Ajout...' : 'Ajouter'}
        </button>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map(s => (
          <div
            key={s.id}
            className="group relative rounded-2xl bg-[#0b0a1f] border border-white/10 p-4 flex flex-col gap-3 shadow hover:shadow-xl transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center overflow-hidden">
                <img
                  src={s.logo_url}
                  alt={s.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <p className="font-semibold leading-none">{s.name}</p>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {s.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => remove(s.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-full w-8 h-8 flex items-center justify-center"
              title="Supprimer"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
