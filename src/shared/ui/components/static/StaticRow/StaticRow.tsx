'use client'

import { useState } from 'react'
import { StaticContent } from '@/shared/entities/StaticContent'

type Props = {
  item: StaticContent
  onSave: (id: string, value: string) => void
  onDelete: (id: string) => void
}

export function StaticRow({ item, onSave, onDelete }: Props) {
  const [value, setValue] = useState(item.value)
  const [editing, setEditing] = useState(false)

  return (
    <div className="flex gap-4 items-center bg-[#0b0a1f] p-4 rounded-lg">
      <div className="w-1/4 text-sm text-gray-400">{item.key}</div>

      <div className="flex-1">
        {item.type === 'image' ? (
          <img
            src={value}
            alt=""
            className="h-16 object-contain rounded bg-black/30 p-1"
          />
        ) : (
          <textarea
            value={value}
            disabled={!editing}
            onChange={e => setValue(e.target.value)}
            className="w-full bg-[#15143a] rounded p-2 text-sm resize-none"
            rows={2}
          />
        )}
      </div>

      <div className="flex gap-2">
        {editing ? (
          <button
            onClick={() => {
              onSave(item.id, value)
              setEditing(false)
            }}
            className="px-3 py-1 rounded bg-green-600 text-xs"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="px-3 py-1 rounded bg-indigo-600 text-xs"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => onDelete(item.id)}
          className="px-3 py-1 rounded bg-red-600 text-xs"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
