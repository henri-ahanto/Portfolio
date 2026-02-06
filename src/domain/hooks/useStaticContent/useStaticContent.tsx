'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export type StaticContent = {
  id: string
  key: string
  type: 'text' | 'image'
  value: string
}

export function useStaticContent() {
  const [data, setData] = useState<StaticContent[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAll = async () => {
    const { data, error } = await supabase
      .from('static_contents')
      .select('*')
      .order('updated_at', { ascending: false })

    if (!error) setData(data || [])
    setLoading(false)
  }

  const update = async (id: string, value: string) => {
    await supabase.from('static_contents').update({ value }).eq('id', id)
    await fetchAll()
  }

  const create = async (payload: Omit<StaticContent, 'id'>) => {
    await supabase.from('static_contents').insert(payload)
    await fetchAll()
  }

  const remove = async (id: string) => {
    await supabase.from('static_contents').delete().eq('id', id)
    await fetchAll()
  }

  useEffect(() => {
    fetchAll()
  }, [])

  return { data, loading, update, create, remove, refetch: fetchAll }
}
