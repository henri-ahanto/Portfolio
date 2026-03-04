import { static_contents as StaticContent } from "../database/prisma/generated/client";


export interface StaticContentsPanigation {
    items: StaticContent[]
    meta: {
        totalItems: number,
        totalPages: number,
        currentPage: number,
        pageSize: number
    }
}

export type { StaticContent }