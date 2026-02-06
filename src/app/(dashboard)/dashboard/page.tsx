'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/domain/services/supabaseClient'

export default function DashboardPage() {
  const [stats, setStats] = useState<unknown>(null)

  useEffect(() => {
    const fetch = async () => {
      const [{ count: parcours }, { count: achievements }, { count: stacks }, { count: messages }] =
        await Promise.all([
          supabase.from('parcours').select('*', { count: 'exact', head: true }),
          supabase.from('achievements').select('*', { count: 'exact', head: true }),
          supabase.from('stacks').select('*', { count: 'exact', head: true }),
          supabase.from('messages').select('*', { count: 'exact', head: true }),
        ])

      setStats({
        parcours,
        achievements,
        stacks,
        messages,
      })
    }

    fetch()
  }, [])

  if (!stats) return null

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6">
        {Object.entries(stats).map(([k, v]) => (
          <div key={k} className="bg-black p-6 rounded-xl">
            <p className="text-gray-400 capitalize">{k}</p>
            <p className="text-3xl font-bold mt-2">{v}</p>
          </div>
        ))}
      </div>
    </>
  )
}
