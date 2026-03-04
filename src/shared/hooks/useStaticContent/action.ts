/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { StaticContentsRepository } from '@/data/repositories/static_content_repository'
import prisma from '@/shared/services/remote_db/prisma_service'
import { GetPaginateStaticContentUseCase } from '@/domain/usecases/static_contents/get_paginate'
import { CreateStaticContentUseCase } from '@/domain/usecases/static_contents/create'
import { UpdateStaticContentUseCase } from '@/domain/usecases/static_contents/update'
import { DeleteStaticContentUseCase } from '@/domain/usecases/static_contents/delete'

const repo = new StaticContentsRepository(prisma)

export async function getStaticContentAction(page: number, pageSize: number) {
    return await new GetPaginateStaticContentUseCase(repo).execute({ page, peer_page: pageSize })
}

export async function createStaticContentAction(payload: any) {
    return await new CreateStaticContentUseCase(repo).execute(payload)
}

export async function updateStaticContentAction(key: string, value: string) {
    return await new UpdateStaticContentUseCase(repo).execute({ key, value })
}

export async function deleteStaticContentAction(key: string) {
    return await new DeleteStaticContentUseCase(repo).execute({ key })
}