'use client'

import { useEffect, useState } from 'react'
import { achievementsService } from '@/domain/services/achievements.service'
import { Achievement } from '@/domain/entities/Achievement'

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