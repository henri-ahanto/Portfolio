'use client'

import { useEffect, useState } from 'react'
import { stacksService } from '@/domain/services/stacks.service'

export const useStacks = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    const { data } = await stacksService.list()
    setData(data || [])
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  return { data, loading, refresh: fetch }
}
