import { parcours } from "@/shared/database/prisma/generated/client";

// ─── Entity ───────────────────────────────────────────────────────────────────

export type Parcours = parcours;

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface ParcoursPagination {
    items: Parcours[];
    meta: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
    };
}

// ─── Payloads ─────────────────────────────────────────────────────────────────

export interface CreateParcoursPayload {
    title: string;
    description?: string;
    company?: string;
    start_date?: Date;
    end_date?: Date;
    is_pinned?: boolean;
    period?: string;
    tags?: string[];
    location?: string;
}

export interface UpdateParcoursPayload {
    title?: string;
    description?: string;
    company?: string;
    start_date?: Date;
    end_date?: Date;
    is_pinned?: boolean;
    period?: string;
    tags?: string[];
    location?: string;
}