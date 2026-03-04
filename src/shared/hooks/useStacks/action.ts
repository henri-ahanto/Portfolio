/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { StacksRepositoryImpl } from '@/data/repositories/stack.repositoryimpl'
import prisma from '@/shared/services/remote_db/prisma_service'
import { GetPaginatedStacksUseCase } from '@/domain/usecases/stack/get_paginated'
import { CreateStackUseCase } from '@/domain/usecases/stack/create'
import { UpdateStackUseCase } from '@/domain/usecases/stack/update'
import { DeleteStackUseCase } from '@/domain/usecases/stack/delete'

const repo = new StacksRepositoryImpl(prisma)

export async function getStacksAction(page: number, pageSize: number) {
    return await new GetPaginatedStacksUseCase(repo).execute({ page, pageSize })
}

export async function createStackAction(payload: any) {
    return await new CreateStackUseCase(repo).execute(payload)
}

export async function updateStackAction(id: string, payload: any) {
    return await new UpdateStackUseCase(repo).execute({ id, ...payload })
}

export async function deleteStackAction(id: string) {
    return await new DeleteStackUseCase(repo).execute({ id })
}
