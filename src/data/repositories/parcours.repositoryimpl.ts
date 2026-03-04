import { PrismaClient } from "@/shared/database/prisma/generated/client";
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
} from "@/shared/database/prisma/generated/internal/prismaNamespace";
import { PrismaClientRustError } from "@prisma/client-runtime-utils";
import { PrismaClientInitializationError } from "@prisma/client/runtime/client";
import { ParcoursError } from "@/shared/errors/parcour.error";
import {
    Parcours,
    ParcoursPagination,
    CreateParcoursPayload,
    UpdateParcoursPayload,
} from "@/shared/entities/types/parcour.type";
import { ParcoursRepository as DomainParcoursRepository } from "@/domain/repository/parcours.repo";

export class ParcoursRepository extends DomainParcoursRepository {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        super();
        this.#prisma = prisma;
    }

    // CREATE
    public async create(payload: CreateParcoursPayload): Promise<Parcours> {
        try {
            return await this.#prisma.parcours.create({
                data: {
                    title: payload.title,
                    description: payload.description ?? null,
                    company: payload.company ?? null,
                    start_date: payload.start_date ?? null,
                    end_date: payload.end_date ?? null,
                    is_pinned: payload.is_pinned ?? false,
                    period: payload.period ?? "2024-2026",
                    tags: payload.tags ?? [],
                    location: payload.location ?? null,
                },
            });
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // READ: Récupérer un parcours par son ID
    public async findById(id: string): Promise<Parcours | null> {
        try {
            return await this.#prisma.parcours.findUnique({
                where: { id },
            });
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // READ: Tous les parcours paginés
    public async getPaginated(
        page: number = 1,
        pageSize: number = 10
    ): Promise<ParcoursPagination> {
        try {
            const skip = (page - 1) * pageSize;

            const [items, totalCount] = await this.#prisma.$transaction([
                this.#prisma.parcours.findMany({
                    skip,
                    take: pageSize,
                    orderBy: { start_date: "desc" },
                }),
                this.#prisma.parcours.count(),
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

    // READ: Parcours épinglés uniquement
    public async getPinned(limit: number = 6): Promise<Parcours[]> {
        try {
            return await this.#prisma.parcours.findMany({
                where: { is_pinned: true },
                orderBy: { start_date: "desc" },
                take: limit,
            });
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // UPDATE
    public async update(
        id: string,
        payload: UpdateParcoursPayload
    ): Promise<Parcours> {
        try {
            return await this.#prisma.parcours.update({
                where: { id },
                data: {
                    title: payload.title,
                    description: payload.description,
                    company: payload.company,
                    start_date: payload.start_date,
                    end_date: payload.end_date,
                    is_pinned: payload.is_pinned,
                    period: payload.period,
                    tags: payload.tags,
                    location: payload.location,
                    updated_at: new Date(),
                },
            });
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // DELETE
    public async delete(id: string): Promise<Parcours> {
        try {
            return await this.#prisma.parcours.delete({
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
                throw new ParcoursError("Parcours not found.", 404);
            }
            if (error.code === "P2011" || error.code === "P2003") {
                const field = (error.meta?.constraint ?? error.meta?.field_name ?? "unknown").toString();
                throw new ParcoursError(`Required field is missing or null: '${field}'.`, 400, field);
            }
            if (error.code === "P2002") {
                const target = Array.isArray(error.meta?.target)
                    ? (error.meta.target as string[]).join(", ")
                    : (error.meta?.target ?? "unknown").toString();
                throw new ParcoursError(`Unique constraint violation on field(s): '${target}'.`, 409, target);
            }
            throw new ParcoursError(error.message, 500);
        }

        if (
            error instanceof PrismaClientInitializationError ||
            error instanceof PrismaClientRustError ||
            error instanceof PrismaClientUnknownRequestError
        ) {
            throw new ParcoursError("Database connection or internal engine error.", 500);
        }

        if (error instanceof Error) {
            throw new ParcoursError(error.message, 500);
        }

        throw new ParcoursError("An unknown error occurred.", 500);
    }
}