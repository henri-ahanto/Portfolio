/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { achievementsService } from '@/shared/services/achievements.service'

export const useAchievements = (limit?: number) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    const { data } = await achievementsService.list(limit)
    setData(data || [])
    setLoading(false)
  }

  useEffect(() => {
    return () => { fetch() }
  })

  return { data, loading, refresh: fetch }
}

export const find = async (id: string) => {
  const data = await achievementsService.find(id);

  // On mappe les données brutes vers notre type Achievement
  return {
    id: data.id,
    title: data.title,
    description: data.description || '',
    image_url: data.image_url,
    demo_link: data.demo_link,
    repository_link: data.repository_link,
    status: data.status,
    is_pinned: data.is_pinned ?? false,
    created_at: data.created_at
  };
};