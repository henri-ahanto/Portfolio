export interface HandleErrorRepositoryInterface {
    handlePrismaError(error: unknown): never;
}