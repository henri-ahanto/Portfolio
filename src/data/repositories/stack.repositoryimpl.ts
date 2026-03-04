import { PrismaClient } from "@/shared/database/prisma/generated/client";
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
} from "@/shared/database/prisma/generated/internal/prismaNamespace";
import { PrismaClientRustError } from "@prisma/client-runtime-utils";
import { PrismaClientInitializationError } from "@prisma/client/runtime/client";
import { StackError } from "@/shared/errors/stack.error";
import {
    Stack,
    StacksPagination,
    CreateStackPayload,
    UpdateStackPayload,
} from "@/shared/entities/types/stack.type";
import { StacksRepository as DomainStacksRepository } from "@/domain/repository/stack.repo";
import { HandleErrorRepositoryInterface } from "@/shared/entities/interfaces/handlerrorrepository.interface";

export class StacksRepositoryImpl extends DomainStacksRepository implements HandleErrorRepositoryInterface {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        super();
        this.#prisma = prisma;
    }

    // CREATE
    public async create(payload: CreateStackPayload): Promise<Stack> {
        try {
            return await this.#prisma.stacks.create({
                data: {
                    name: payload.name,
                    description: payload.description ?? null,
                    logo_url: payload.logo_url ?? null,
                },
            });
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // READ: Récupérer un stack par son ID
    public async findById(id: string): Promise<Stack | null> {
        try {
            return await this.#prisma.stacks.findUnique({
                where: { id },
            });
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // READ: Tous les stacks paginés
    public async getPaginated(
        page: number = 1,
        pageSize: number = 10
    ): Promise<StacksPagination> {
        try {
            const skip = (page - 1) * pageSize;

            const [items, totalCount] = await this.#prisma.$transaction([
                this.#prisma.stacks.findMany({
                    skip,
                    take: pageSize,
                    orderBy: { created_at: "asc" },
                }),
                this.#prisma.stacks.count(),
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
        payload: UpdateStackPayload
    ): Promise<Stack> {
        try {
            return await this.#prisma.stacks.update({
                where: { id },
                data: {
                    name: payload.name,
                    description: payload.description,
                    logo_url: payload.logo_url,
                    updated_at: new Date(),
                },
            });
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // DELETE
    public async delete(id: string): Promise<Stack> {
        try {
            return await this.#prisma.stacks.delete({
                where: { id },
            });
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // ─── Error Handler ─────────────────────────────────────────────────────────

    public handlePrismaError(error: unknown): never {
        console.error("Database Operation Failed:", error);

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                throw new StackError("Stack not found.", 404);
            }
            if (error.code === "P2011" || error.code === "P2003") {
                const field = (error.meta?.constraint ?? error.meta?.field_name ?? "unknown").toString();
                throw new StackError(`Required field is missing or null: '${field}'.`, 400, field);
            }
            if (error.code === "P2002") {
                const target = Array.isArray(error.meta?.target)
                    ? (error?.meta?.target as string[]).join(", ")
                    : (error.meta?.target ?? "unknown").toString();
                throw new StackError(`Unique constraint violation on field(s): '${target}'.`, 409, target);
            }
            throw new StackError(error.message, 500);
        }

        if (
            error instanceof PrismaClientInitializationError ||
            error instanceof PrismaClientRustError ||
            error instanceof PrismaClientUnknownRequestError
        ) {
            throw new StackError("Database connection or internal engine error.", 500);
        }

        if (error instanceof Error) {
            throw new StackError(error.message, 500);
        }

        throw new StackError("An unknown error occurred.", 500);
    }
}