import { NextResponse } from 'next/server'
import { MessagesRepositoryImpl } from '@/data/repositories/message.repositoryimpl'
import prisma from '@/shared/services/remote_db/prisma_service'
import { GetPaginatedMessagesUseCase } from '@/domain/usecases/messages/get_paginated'
import { CreateMessageUseCase } from '@/domain/usecases/messages/create'

const repo = new MessagesRepositoryImpl(prisma)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '10')

  try {
    const result = await new GetPaginatedMessagesUseCase(repo).execute({ page, pageSize })
    return NextResponse.json(result)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch messages'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const result = await new CreateMessageUseCase(repo).execute(payload)
    return NextResponse.json(result, { status: 201 })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create message'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
