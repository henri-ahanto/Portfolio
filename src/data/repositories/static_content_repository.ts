import { PrismaClient, static_contents } from "@/shared/database/prisma/generated/client";
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@/shared/database/prisma/generated/internal/prismaNamespace";
import { StaticContentsPanigation } from "@/shared/entities/StaticContent";
import { StaticContentType } from "@/shared/entities/types/static_content_type";
import { StaticContentError } from "@/shared/errors/staticContentError";
import { PrismaClientRustError } from "@prisma/client-runtime-utils";
import { PrismaClientInitializationError } from "@prisma/client/runtime/client";

export class StaticContentsRepository {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.#prisma = prisma;
    }

    // CREATE: Permanent save of static content
    public async create(key: string, type: StaticContentType, value: string) {
        try {
            return await this.#prisma.static_contents.create({
                data: { key, type, value }
            });
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // READ: Get content by its unique key
    public async getByKey(key: string): Promise<static_contents | null> {

        try {
            const static_content = await this.#prisma.static_contents.findUnique({
                where: { key }
            });

            return static_content
        } catch (error) {
            this.handlePrismaError(error)
        }

    }

    // READ: Get all static contents
    /**
     * READ: Paginated results
     * @param page - Current page number (1-indexed)
     * @param pageSize - Number of items per page
     */
    public async getPaginated(page: number = 1, pageSize: number = 10): Promise<StaticContentsPanigation> {
        try {
            const skip = (page - 1) * pageSize;

            const [items, totalCount] = await this.#prisma.$transaction([
                this.#prisma.static_contents.findMany({
                    skip: skip,
                    take: pageSize,
                    orderBy: { updated_at: 'desc' },
                }),
                this.#prisma.static_contents.count(),
            ]);

            return {
                items: items,
                meta: {
                    totalItems: totalCount,
                    totalPages: Math.ceil(totalCount / pageSize),
                    currentPage: page,
                    pageSize: pageSize
                }
            };
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    // UPDATE: Modify existing content
    public async update(key: string, value: string) {
        try {
            return await this.#prisma.static_contents.update({
                where: { key },
                data: {
                    value,
                    updated_at: new Date()
                }
            });
        } catch (error) {
            this.handlePrismaError(error)
        }
    }

    // DELETE: Permanent removal from database
    public async delete(key: string) {
        try {
            return await this.#prisma.static_contents.delete({
                where: { key }
            });
        } catch (error) {
            this.handlePrismaError(error)
        }
    }

    private handlePrismaError(error: unknown): never {
        console.error("Database Operation Failed:", error);

        if (error instanceof PrismaClientKnownRequestError) {
            // P2011 is the specific Prisma code for NOT NULL constraint violation (your 23502 error)
            if (error.code === 'P2011' || error.code === 'P2003') {
                throw new StaticContentError("Required fields are missing.", 400);
            }
            if (error.code === 'P2002') {
                throw new StaticContentError("Unique constraint violation (Key already exists).", 409);
            }
            throw new StaticContentError(error.message, 500);
        }

        if (
            error instanceof PrismaClientInitializationError ||
            error instanceof PrismaClientRustError ||
            error instanceof PrismaClientUnknownRequestError
        ) {
            throw new StaticContentError("Database connection or internal engine error.", 500);
        }

        if (error instanceof Error) {
            throw new StaticContentError(error.message, 500);
        }

        throw new StaticContentError("An unknown error occurred.", 500);
    }
}