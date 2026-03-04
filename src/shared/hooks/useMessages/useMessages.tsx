'use client'

import { useEffect, useState } from 'react'
import { messagesService } from '@/shared/services/messages.service'

export const useMessages = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    const { data } = await messagesService.list()
    setData(data || [])
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  return { data, loading, refresh: fetch }
}
