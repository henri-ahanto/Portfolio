/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState, useMemo } from 'react'
import { StaticContent } from '@/shared/entities/StaticContent' // Use your existing entity type
import { StaticContentsRepository } from '@/data/repositories/static_content.repositoryimpl'
import prisma from '@/shared/services/remote_db/prisma_service'

// Import all your Use Cases
import { CreateStaticContentUseCase } from '@/domain/usecases/static_contents/create'
import { UpdateStaticContentUseCase } from '@/domain/usecases/static_contents/update'
import { DeleteStaticContentUseCase } from '@/domain/usecases/static_contents/delete'
import { StaticContentType } from '@/shared/entities/types/static_content.type'
import { getStaticContentAction } from './action'

export function useStaticContent() {
  const [data, setData] = useState<StaticContent[]>([]);
  const [meta, setMeta] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 });
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Memoize dependencies to prevent unnecessary re-instantiation
  const { createUC, updateUC, deleteUC } = useMemo(() => {
    const repository = new StaticContentsRepository(prisma)
    return {
      createUC: new CreateStaticContentUseCase(repository),
      updateUC: new UpdateStaticContentUseCase(repository),
      deleteUC: new DeleteStaticContentUseCase(repository),
    }
  }, [])

  const fetchPage = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await getStaticContentAction(page, 8)
      setData(response.items);
      setMeta(response.meta); // Save total pages and current page
    } catch (err: any) {
      console.error(err);
      setError(err)
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (payload: { key: string, type: StaticContentType, value: string }) => {
    try {
      await createUC.execute(payload)
      await fetchPage(meta.currentPage)
    } catch (err: any) {
      alert(err)
      setError(err)
    }
  }

  const handleUpdate = async (key: string, value: string) => {
    try {
      await updateUC.execute({ key, value })
      await fetchPage(meta.currentPage)
    } catch (err: any) {

      alert(err.message)
      setError(err)
    }
  }

  const handleRemove = async (key: string) => {
    try {
      await deleteUC.execute({ key })
      await fetchPage(meta.currentPage)
    } catch (err: any) {
      alert(err.message)
      setError(err)
    }
  }

  useEffect(() => {
    fetchPage()
  },)

  return {
    data,
    loading,
    error,
    meta,
    fetchPage,
    create: handleCreate,
    update: handleUpdate,
    remove: handleRemove,
    refetch: fetchPage
  }
}