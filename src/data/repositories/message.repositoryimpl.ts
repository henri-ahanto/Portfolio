import { PrismaClient } from "@/shared/database/prisma/generated/client";
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
} from "@/shared/database/prisma/generated/internal/prismaNamespace";
import { PrismaClientRustError } from "@prisma/client-runtime-utils";
import { PrismaClientInitializationError } from "@prisma/client/runtime/client";
import { MessageError } from "@/shared/errors/message.error";
import {
    Message,
    MessagesPagination,
    CreateMessagePayload,
    UpdateMessagePayload,
} from "@/shared/entities/types/message.type";
import { MessagesRepository as DomainMessagesRepository } from "@/domain/repository/message.repo";

export class MessagesRepository extends DomainMessagesRepository {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        super();
        this.#prisma = prisma;
    }

    // CREATE
    public async create(payload: CreateMessagePayload): Promise<Message> {
        try {
            return await this.#prisma.messages.create({
                data: {
                    fullname: payload.fullname,
                    email:    payload.email,
                    subject:  payload.subject,
                    message:  payload.message ?? null,
                    is_read:  payload.is_read  ?? false,
                },
            });
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // READ: Récupérer un message par son ID
    public async findById(id: string): Promise<Message | null> {
        try {
            return await this.#prisma.messages.findUnique({
                where: { id },
            });
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // READ: Tous les messages paginés
    public async getPaginated(
        page: number = 1,
        pageSize: number = 10
    ): Promise<MessagesPagination> {
        try {
            const skip = (page - 1) * pageSize;

            const [items, totalCount] = await this.#prisma.$transaction([
                this.#prisma.messages.findMany({
                    skip,
                    take: pageSize,
                    orderBy: { created_at: "desc" },
                }),
                this.#prisma.messages.count(),
            ]);

            return {
                items,
                meta: {
                    totalItems: totalCount,
                    totalPages: Math.ceil(totalCount / pageSize),
                    currentPage: page,
                    pageSize,
                },
            };
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // UPDATE
    public async update(
        id: string,
        payload: UpdateMessagePayload
    ): Promise<Message> {
        try {
            return await this.#prisma.messages.update({
                where: { id },
                data: {
                    fullname:   payload.fullname,
                    email:      payload.email,
                    subject:    payload.subject,
                    message:    payload.message,
                    is_read:    payload.is_read,
                    updated_at: new Date(),
                },
            });
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // UPDATE: Marquer un message comme lu
    public async markRead(id: string): Promise<Message> {
        try {
            return await this.#prisma.messages.update({
                where: { id },
                data: {
                    is_read:    true,
                    updated_at: new Date(),
                },
            });
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // DELETE
    public async delete(id: string): Promise<Message> {
        try {
            return await this.#prisma.messages.delete({
                where: { id },
            });
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // ─── Error Handler ─────────────────────────────────────────────────────────

    private handlePrismaError(error: unknown): never {
        console.error("Database Operation Failed:", error);

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                throw new MessageError("Message not found.", 404);
            }
            if (error.code === "P2011" || error.code === "P2003") {
                const field = (error.meta?.constraint ?? error.meta?.field_name ?? "unknown").toString();
                throw new MessageError(`Required field is missing or null: '${field}'.`, 400, field);
            }
            if (error.code === "P2002") {
                const target = Array.isArray(error.meta?.target)
                    ? (error?.meta?.target as string[]).join(", ")
                    : (error.meta?.target ?? "unknown").toString();
                throw new MessageError(`Unique constraint violation on field(s): '${target}'.`, 409, target);
            }
            throw new MessageError(error.message, 500);
        }

        if (
            error instanceof PrismaClientInitializationError ||
            error instanceof PrismaClientRustError ||
            error instanceof PrismaClientUnknownRequestError
        ) {
            throw new MessageError("Database connection or internal engine error.", 500);
        }

        if (error instanceof Error) {
            throw new MessageError(error.message, 500);
        }

        throw new MessageError("An unknown error occurred.", 500);
    }
}