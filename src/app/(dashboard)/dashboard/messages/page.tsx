'use client'

import { useMessages } from '@/domain/hooks/useMessages/useMessages'
import { messagesService } from '@/domain/services/messages.service'

export default function MessagesAdminPage() {
  const { data, refresh } = useMessages()

  const markRead = async (id: string) => {
    await messagesService.markRead(id)
    refresh()
  }

  const remove = async (id: string) => {
    await messagesService.delete(id)
    refresh()
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      <div className="grid gap-4">
        {data.map(m => (
          <div
            key={m.id}
            className={`p-4 rounded bg-black flex justify-between ${
              !m.is_read ? 'border border-purple-500' : ''
            }`}
          >
            <div>
              <h3 className="font-bold">{m.name}</h3>
              <p className="text-sm text-gray-400">{m.email}</p>
              <p className="mt-2">{m.message}</p>
            </div>
            <div className="flex flex-col gap-3">
              {!m.is_read && (
                <button onClick={() => markRead(m.id)}>✅</button>
              )}
              <button onClick={() => remove(m.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
