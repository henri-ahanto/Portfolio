
import { Achievement, AchievementsPagination, CreateAchievementPayload, UpdateAchievementPayload } from "@/shared/entities/types/achievement.type";

export abstract class AchievementsRepository {


    // CREATE
    abstract create(payload: CreateAchievementPayload): Promise<Achievement>;

    // READ: Récupérer un achievement par son ID
    abstract findById(id: string): Promise<Achievement | null>;

    // READ: Tous les achievements paginés
    abstract getPaginated(page: number, pageSize: number): Promise<AchievementsPagination>;

    // READ: Achievements épinglés uniquement
    abstract getPinned(limit: number): Promise<Achievement[]>;

    // UPDATE
    abstract update(
        id: string,
        payload: UpdateAchievementPayload
    ): Promise<Achievement>;

    // DELETE
    abstract delete(id: string): Promise<Achievement>;

}