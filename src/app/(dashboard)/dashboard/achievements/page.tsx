'use client'

import { useAchievements } from '@/domain/hooks/useAchievements/useAchievements'
import { achievementsService } from '@/domain/services/achievements.service'
import { useState } from 'react'
import { supabase } from '@/domain/services/supabaseClient'

export default function AchievementsAdminPage() {
  const { data, refresh } = useAchievements()
  const [form, setForm] = useState<any>({})
  const [editingId, setEditingId] = useState<string | null>(null)

  const uploadImage = async (file: File) => {
    const path = `achievements/${Date.now()}-${file.name}`
    await supabase.storage.from('achievements').upload(path, file)
    const { data } = supabase.storage.from('achievements').getPublicUrl(path)
    return data.publicUrl
  }

  const submit = async (file?: File) => {
    let image_url = form.image_url
    if (file) image_url = await uploadImage(file)

    if (editingId) {
      await achievementsService.update(editingId, { ...form, image_url })
    } else {
      await achievementsService.create({ ...form, image_url })
    }
    setForm({})
    setEditingId(null)
    refresh()
  }

  const remove = async (id: string) => {
    await achievementsService.delete(id)
    refresh()
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Achievements</h1>

      <div className="bg-black p-6 rounded-xl mb-10 flex flex-col gap-4">
        <input
          placeholder="Titre"
          className="p-3 rounded bg-[#111]"
          value={form.title || ''}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="p-3 rounded bg-[#111]"
          value={form.description || ''}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => submit(e.target.files?.[0] || undefined)}
        />
        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={form.is_pinned || false}
            onChange={e => setForm({ ...form, is_pinned: e.target.checked })}
          />
          Épingler sur l'accueil
        </label>

        <button onClick={() => submit()} className="bg-purple-600 py-3 rounded">
          {editingId ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>

      <div className="grid gap-4">
        {data.map(a => (
          <div key={a.id} className="bg-black p-4 rounded flex justify-between">
            <div>
              <h3 className="font-bold">{a.title}</h3>
              <p className="text-sm text-gray-400">{a.description}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setEditingId(a.id)
                  setForm(a)
                }}
              >
                ✏️
              </button>
              <button onClick={() => remove(a.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
