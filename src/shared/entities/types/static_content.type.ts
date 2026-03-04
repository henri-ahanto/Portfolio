import { static_contents } from "@/shared/database/prisma/generated/client"

export type StaticContentType = 'text' | 'image'

export interface CreateStaticContentPayload {
    key: string
    type: StaticContentType
    value: string
}

export interface UpdateStaticContentPayload {
    key: string
    value: string
}

export interface GetByKeyStaticContentPayload {
    key: string
}

export interface GetPaginatedStaticContentPayload {
    page: number
    pageSize: number
}

export interface DeleteStaticContentPayload {
    key: string
}


export interface StaticContentsPanigation {
    items: static_contents[]
    meta: {
        totalItems: number,
        totalPages: number,
        currentPage: number,
        pageSize: number
    }
}