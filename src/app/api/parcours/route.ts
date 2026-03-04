import { NextResponse } from 'next/server'
import { ParcoursRepositoryImpl } from '@/data/repositories/parcours.repositoryimpl'
import prisma from '@/shared/services/remote_db/prisma_service'
import { GetPaginatedParcoursUseCase } from '@/domain/usecases/parcours/get_paginated'
import { CreateParcoursUseCase } from '@/domain/usecases/parcours/create'

const repo = new ParcoursRepositoryImpl(prisma)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '10')

  try {
    const result = await new GetPaginatedParcoursUseCase(repo).execute({ page, pageSize })
    return NextResponse.json(result)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch parcours'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const result = await new CreateParcoursUseCase(repo).execute(payload)
    return NextResponse.json(result, { status: 201 })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create parcours'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
