import { NextResponse } from 'next/server'
import { AchievementsRepositoryImpl } from '@/data/repositories/achievements.repositoryimpl'
import prisma from '@/shared/services/remote_db/prisma_service'
import { GetPaginatedAchievementsUseCase } from '@/domain/usecases/achievements/get_paginated'
import { CreateAchievementUseCase } from '@/domain/usecases/achievements/create'

const repo = new AchievementsRepositoryImpl(prisma)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '10')

  try {
    const result = await new GetPaginatedAchievementsUseCase(repo).execute({ page, pageSize })
    return NextResponse.json(result)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch achievements'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const result = await new CreateAchievementUseCase(repo).execute(payload)
    return NextResponse.json(result, { status: 201 })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create achievement'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
