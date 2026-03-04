import { Parcours, ParcoursPagination, CreateParcoursPayload, UpdateParcoursPayload } from "@/shared/entities/types/parcour.type";

export abstract class ParcoursRepository {

    // CREATE
    abstract create(payload: CreateParcoursPayload): Promise<Parcours>;

    // READ: Récupérer un parcours par son ID
    abstract findById(id: string): Promise<Parcours | null>;

    // READ: Tous les parcours paginés
    abstract getPaginated(page: number, pageSize: number): Promise<ParcoursPagination>;

    // READ: Parcours épinglés uniquement
    abstract getPinned(limit: number): Promise<Parcours[]>;

    // UPDATE
    abstract update(
        id: string,
        payload: UpdateParcoursPayload
    ): Promise<Parcours>;

    // DELETE
    abstract delete(id: string): Promise<Parcours>;

}
