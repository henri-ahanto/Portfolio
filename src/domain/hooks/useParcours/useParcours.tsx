'use client'

import { useEffect, useState } from 'react'
import { parcoursService } from '@/domain/services/parcours.service'

export const useParcours = (limit?: number) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    setLoading(true)
    const { data } = await parcoursService.list(limit)
    setData(data || [])
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  return { data, loading, refresh: fetch }
}
