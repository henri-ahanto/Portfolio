'use client'

import { useEffect, useState } from 'react'
import { achievementsService } from '@/domain/services/achievements.service'

export const useAchievements = (limit?: number) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    const { data } = await achievementsService.list(limit)
    setData(data || [])
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  return { data, loading, refresh: fetch }
}
