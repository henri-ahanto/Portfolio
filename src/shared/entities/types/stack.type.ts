import { stacks } from "@/shared/database/prisma/generated/client";

// ─── Entity ───────────────────────────────────────────────────────────────────

export type Stack = stacks;

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface StacksPagination {
    items: Stack[];
    meta: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
    };
}

// ─── Payloads ─────────────────────────────────────────────────────────────────

export interface CreateStackPayload {
    name:         string;
    description?: string;
    logo_url?:    string; // URL fournie après upload Supabase Storage
}

export interface UpdateStackPayload {
    name?:        string;
    description?: string;
    logo_url?:    string;
}