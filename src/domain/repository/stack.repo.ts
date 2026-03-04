import { Stack, StacksPagination, CreateStackPayload, UpdateStackPayload } from "@/shared/entities/types/stack.type";

export abstract class StacksRepository {

    // CREATE
    abstract create(payload: CreateStackPayload): Promise<Stack>;

    // READ: Récupérer un stack par son ID
    abstract findById(id: string): Promise<Stack | null>;

    // READ: Tous les stacks paginés
    abstract getPaginated(page: number, pageSize: number): Promise<StacksPagination>;

    // UPDATE
    abstract update(
        id: string,
        payload: UpdateStackPayload
    ): Promise<Stack>;

    // DELETE
    abstract delete(id: string): Promise<Stack>;

}
