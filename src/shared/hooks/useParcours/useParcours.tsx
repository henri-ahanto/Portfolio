'use client'

import { useEffect, useState } from 'react'
import { parcoursService } from '@/shared/services/parcours.service'

export const useParcours = (limit?: number) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    setLoading(true)
    const { data } = await parcoursService.list(limit)
    setData(data || [])
    setLoading(false)
  }

  useEffect(() => {
    return () => { fetch() }
  },)

  return { data, loading, refresh: fetch }
}
