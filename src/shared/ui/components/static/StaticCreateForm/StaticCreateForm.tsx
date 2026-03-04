'use client'

import { StaticContentType } from '@/shared/entities/types/static_content.type'
import { useState } from 'react'

type Props = {
  onCreate: (payload: {
    key: string
    type: 'text' | 'image'
    value: string
  }) => Promise<void>
}

export function StaticCreateForm({ onCreate }: Props) {
  const [keyName, setKeyName] = useState('')
  const [type, setType] = useState<StaticContentType>('text')
  const [value, setValue] = useState('')

  return (
    <div className="bg-[#0b0a1f] p-4 rounded-lg space-y-3">
      <h3 className="font-semibold text-sm">➕ Nouveau contenu statique</h3>

      <input
        value={keyName}
        onChange={e => setKeyName(e.target.value)}
        placeholder="hero.title"
        className="w-full bg-[#15143a] rounded px-3 py-2 text-sm"
      />

      <select
        value={type}
        onChange={e => setType(e.target.value as StaticContentType)}
        className="w-full bg-[#15143a] rounded px-3 py-2 text-sm"
      >
        <option value="text">Text</option>
        <option value="image">Image URL</option>
      </select>

      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Valeur..."
        rows={2}
        className="w-full bg-[#15143a] rounded px-3 py-2 text-sm"
      />

      <button
        onClick={() => {
          onCreate({ key: keyName, type, value })
          setKeyName('')
          setValue('')
        }}
        className="w-full py-2 rounded bg-indigo-600 text-sm font-semibold"
      >
        Créer
      </button>
    </div>
  )
}
