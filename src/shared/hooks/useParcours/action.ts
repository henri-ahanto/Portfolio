/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { ParcoursRepositoryImpl } from '@/data/repositories/parcours.repositoryimpl'
import prisma from '@/shared/services/remote_db/prisma_service'
import { GetPaginatedParcoursUseCase } from '@/domain/usecases/parcours/get_paginated'
import { CreateParcoursUseCase } from '@/domain/usecases/parcours/create'
import { UpdateParcoursUseCase } from '@/domain/usecases/parcours/update'
import { DeleteParcoursUseCase } from '@/domain/usecases/parcours/delete'
import { GetPinnedParcoursUseCase } from '@/domain/usecases/parcours/get_pinned'

const repo = new ParcoursRepositoryImpl(prisma)

export async function getParcoursAction(page: number, pageSize: number) {
    return await new GetPaginatedParcoursUseCase(repo).execute({ page, pageSize })
}

export async function getPinnedParcoursAction(limit: number = 6) {
    return await new GetPinnedParcoursUseCase(repo).execute({ limit })
}

export async function createParcoursAction(payload: any) {
    return await new CreateParcoursUseCase(repo).execute(payload)
}

export async function updateParcoursAction(id: string, payload: any) {
    return await new UpdateParcoursUseCase(repo).execute({ id, ...payload })
}

export async function deleteParcoursAction(id: string) {
    return await new DeleteParcoursUseCase(repo).execute({ id })
}
