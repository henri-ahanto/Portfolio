/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { MessagesRepositoryImpl } from '@/data/repositories/message.repositoryimpl'
import prisma from '@/shared/services/remote_db/prisma_service'
import { GetPaginatedMessagesUseCase } from '@/domain/usecases/messages/get_paginated'
import { CreateMessageUseCase } from '@/domain/usecases/messages/create'
import { UpdateMessageUseCase } from '@/domain/usecases/messages/update'
import { DeleteMessageUseCase } from '@/domain/usecases/messages/delete'
import { MarkReadMessageUseCase } from '@/domain/usecases/messages/mark_read'

const repo = new MessagesRepositoryImpl(prisma)

export async function getMessagesAction(page: number, pageSize: number) {
    return await new GetPaginatedMessagesUseCase(repo).execute({ page, pageSize })
}

export async function createMessageAction(payload: any) {
    return await new CreateMessageUseCase(repo).execute(payload)
}

export async function updateMessageAction(id: string, payload: any) {
    return await new UpdateMessageUseCase(repo).execute({ id, ...payload })
}

export async function deleteMessageAction(id: string) {
    return await new DeleteMessageUseCase(repo).execute({ id })
}

export async function markReadMessageAction(id: string) {
    return await new MarkReadMessageUseCase(repo).execute({ id })
}
