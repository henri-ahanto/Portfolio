import { achievements } from "@/shared/database/prisma/generated/client";

// ─── Entity ───────────────────────────────────────────────────────────────────

 type Achievement = achievements;

// ─── Pagination ───────────────────────────────────────────────────────────────

 interface AchievementsPagination {
    items: Achievement[];
    meta: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
    };
}

// ─── Payloads ─────────────────────────────────────────────────────────────────

 interface CreateAchievementPayload {
    title: string;
    description?: string;
    image_url?: string; // URL fournie après upload Supabase Storage
    demo_link?: string;
    repository_link?: string;
    is_pinned?: boolean;
    status?: string;
}

 interface UpdateAchievementPayload {
    title?: string;
    description?: string;
    image_url?: string;
    demo_link?: string;
    repository_link?: string;
    is_pinned?: boolean;
    status?: string;
}

export type { Achievement, AchievementsPagination, CreateAchievementPayload, UpdateAchievementPayload, }