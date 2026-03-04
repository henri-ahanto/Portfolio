import { PrismaClient } from "@/shared/database/prisma/generated/client";
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
} from "@/shared/database/prisma/generated/internal/prismaNamespace";
import { PrismaClientRustError } from "@prisma/client-runtime-utils";
import { PrismaClientInitializationError } from "@prisma/client/runtime/client";
import { AchievementError } from "@/shared/errors/achievement.error";
import {
    Achievement,
    AchievementsPagination,
    CreateAchievementPayload,
    UpdateAchievementPayload,
} from "@/shared/entities/types/achievement.type";
import { AchievementsRepository } from "@/domain/repository/achievement.repo";
import { HandleErrorRepositoryInterface } from "@/shared/entities/interfaces/handlerrorrepository.interface";

export class AchievementsRepositoryImpl extends AchievementsRepository implements HandleErrorRepositoryInterface {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        super();
        this.#prisma = prisma;
    }

    // CREATE
    public async create(payload: CreateAchievementPayload): Promise<Achievement> {
        try {
            return await this.#prisma.achievements.create({
                data: {
                    title: payload.title,
                    description: payload.description ?? null,
                    image_url: payload.image_url ?? null,
                    demo_link: payload.demo_link ?? null,
                    repository_link: payload.repository_link ?? null,
                    is_pinned: payload.is_pinned ?? false,
                    status: payload.status ?? "start",
                },
            });
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // READ: Récupérer un achievement par son ID
    public async findById(id: string): Promise<Achievement | null> {
        try {
            return await this.#prisma.achievements.findUnique({
                where: { id },
            });
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // READ: Tous les achievements paginés
    public async getPaginated(
        page: number = 1,
        pageSize: number = 10
    ): Promise<AchievementsPagination> {
        try {
            const skip = (page - 1) * pageSize;

            const [items, totalCount] = await this.#prisma.$transaction([
                this.#prisma.achievements.findMany({
                    skip,
                    take: pageSize,
                    orderBy: { created_at: "desc" },
                }),
                this.#prisma.achievements.count(),
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

    // READ: Achievements épinglés uniquement
    public async getPinned(limit: number = 6): Promise<Achievement[]> {
        try {
            return await this.#prisma.achievements.findMany({
                where: { is_pinned: true },
                orderBy: { created_at: "desc" },
                take: limit,
            });
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // UPDATE
    public async update(
        id: string,
        payload: UpdateAchievementPayload
    ): Promise<Achievement> {
        try {
            return await this.#prisma.achievements.update({
                where: { id },
                data: {
                    title: payload.title,
                    description: payload.description,
                    image_url: payload.image_url,
                    demo_link: payload.demo_link,
                    repository_link: payload.repository_link,
                    is_pinned: payload.is_pinned,
                    status: payload.status,
                    updated_at: new Date(),
                },
            });
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // DELETE
    public async delete(id: string): Promise<Achievement> {
        try {
            return await this.#prisma.achievements.delete({
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
                throw new AchievementError("Achievement not found.", 404);
            }
            if (error.code === "P2011" || error.code === "P2003") {
                const field = (error.meta?.constraint ?? error.meta?.field_name ?? "unknown").toString();
                throw new AchievementError(`Required field is missing or null: '${field}'.`, 400, field);
            }
            if (error.code === "P2002") {
                const target = Array.isArray(error.meta?.target)
                    ? (error?.meta?.target as string[]).join(", ")
                    : (error.meta?.target ?? "unknown").toString();
                throw new AchievementError(`Unique constraint violation on field(s): '${target}'.`, 409, target);
            }
            throw new AchievementError(error.message, 500);
        }

        if (
            error instanceof PrismaClientInitializationError ||
            error instanceof PrismaClientRustError ||
            error instanceof PrismaClientUnknownRequestError
        ) {
            throw new AchievementError("Database connection or internal engine error.", 500);
        }

        if (error instanceof Error) {
            throw new AchievementError(error.message, 500);
        }

        throw new AchievementError("An unknown error occurred.", 500);
    }
}