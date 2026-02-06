'use client'

import { useParcours } from '@/domain/hooks/useParcours/useParcours'
import { useState } from 'react'
import { parcoursService } from '@/domain/services/parcours.service'
import { CourseCard } from '@/ui/components/cards/CourseCard/CourseCard'
import Course from '@/domain/entities/Course'

export default function ParcoursAdminPage() {
  const { data, refresh } = useParcours()
  const [form, setForm] = useState<Partial<Course> | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)

  const submit = async () => {
    if (editingId) {
      await parcoursService.update(editingId, form)
    } else {
      await parcoursService.create(form)
    }
    setForm(null)
    setEditingId(null)
    refresh()
  }

  const remove = async (id: string) => {
    await parcoursService.delete(id)
    refresh()
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Parcours</h1>

      <div className="bg-black p-6 rounded-xl mb-10 flex flex-col gap-4">
        <input
          placeholder="Titre"
          className="p-3 rounded bg-[#111]"
          value={form?.title || ''}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="p-3 rounded bg-[#111]"
          value={form?.description || ''}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <input
          placeholder='Periode'
          className="p-3 rounded bg-[#111]"
          value={form?.period || ''}
          onChange={e => setForm({ ...form, period: e.target.value })}
        />
        <input
          placeholder='Emplacement'
          className="p-3 rounded bg-[#111]"
          value={form?.location || ''}
          onChange={e => setForm({ ...form, location: e.target.value })}
        />
        <input
          placeholder='Tags'
          className="p-3 rounded bg-[#111]"
          value={form?.tags?.join(',') || ''}
          onChange={e => setForm({ ...form, tags: e.target.value.split(',') })}
        />
        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={form?.is_pinned || false}
            onChange={e => setForm({ ...form, is_pinned: e.target.checked })}
          />
          Épingler sur l'accueil
        </label>

        <button onClick={submit} className="bg-purple-600 py-3 rounded">
          {editingId ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>

      <div className="grid gap-4 overflow-scroll">
        {data.map(p => (
          <div key={p.id} className="p-4 rounded flex justify-between gap-4">
            <CourseCard
              key={p.id}
              title={p.title}
              description={p.description}
              period={p.period}
              location={p.location}
              tags={p.tags}
            />
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setEditingId(p.id)
                  setForm(p)
                }}
              >
                ✏️
              </button>
              <button onClick={() => remove(p.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
