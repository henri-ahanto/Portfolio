/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { AchievementsRepositoryImpl } from '@/data/repositories/achievements.repositoryimpl'
import prisma from '@/shared/services/remote_db/prisma_service'
import { GetPaginatedAchievementsUseCase } from '@/domain/usecases/achievements/get_paginated'
import { CreateAchievementUseCase } from '@/domain/usecases/achievements/create'
import { UpdateAchievementUseCase } from '@/domain/usecases/achievements/update'
import { DeleteAchievementUseCase } from '@/domain/usecases/achievements/delete'
import { GetPinnedAchievementsUseCase } from '@/domain/usecases/achievements/get_pinned'

const repo = new AchievementsRepositoryImpl(prisma)

export async function getAchievementsAction(page: number, pageSize: number) {
    return await new GetPaginatedAchievementsUseCase(repo).execute({ page, pageSize })
}

export async function getPinnedAchievementsAction(limit: number = 6) {
    return await new GetPinnedAchievementsUseCase(repo).execute({ limit })
}

export async function createAchievementAction(payload: any) {
    return await new CreateAchievementUseCase(repo).execute(payload)
}

export async function updateAchievementAction(id: string, payload: any) {
    return await new UpdateAchievementUseCase(repo).execute({ id, ...payload })
}

export async function deleteAchievementAction(id: string) {
    return await new DeleteAchievementUseCase(repo).execute({ id })
}
