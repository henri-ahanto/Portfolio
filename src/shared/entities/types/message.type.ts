import { messagesGetPayload } from "@/shared/database/prisma/generated/models/messages";

// ─── Entity ───────────────────────────────────────────────────────────────────

export type Message = messagesGetPayload<null>;

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface MessagesPagination {
    items: Message[];
    meta: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
    };
}

// ─── Payloads ─────────────────────────────────────────────────────────────────

export interface CreateMessagePayload {
    fullname: string;
    email:    string;
    subject:  string;
    message?: string;
    is_read?: boolean;
}

export interface UpdateMessagePayload {
    fullname?: string;
    email?:    string;
    subject?:  string;
    message?:  string;
    is_read?:  boolean;
}