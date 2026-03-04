'use client'

import { useEffect, useState } from 'react'
import { staticTextsService } from '@/shared/services/staticTexts.service'

export default function SettingsPage() {
  const [keyName, setKeyName] = useState('')
  const [value, setValue] = useState('')
  const [items, setItems] = useState<any[]>([])

  const fetchData = async () => {
    const { data } = await (await fetch('/api/static-texts')).json()
    setItems(data || [])
  }

  useEffect(() => { fetchData() }, [])

  const submit = async () => {
    await staticTextsService.update(keyName, value)
    setKeyName('')
    setValue('')
    fetchData()
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Contenus statiques</h1>

      <div className="bg-black p-6 rounded-xl mb-10 flex gap-4">
        <input
          placeholder="Key"
          className="p-3 rounded bg-[#111]"
          value={keyName}
          onChange={e => setKeyName(e.target.value)}
        />
        <input
          placeholder="Valeur"
          className="p-3 rounded bg-[#111] flex-1"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button onClick={submit} className="bg-purple-600 px-6 rounded">
          Sauver
        </button>
      </div>

      <div className="grid gap-4">
        {items.map(i => (
          <div key={i.key} className="bg-black p-4 rounded flex justify-between">
            <span>{i.key}</span>
            <span className="text-gray-400">{i.value}</span>
          </div>
        ))}
      </div>
    </>
  )
}
