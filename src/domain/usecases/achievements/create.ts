import { AchievementsRepositoryImpl } from "@/data/repositories/achievements.repositoryimpl"
import { Achievement } from "@/shared/entities/types/achievement.type"
import { CreateAchievementPayload } from "@/shared/entities/types/achievement.type"

export class CreateAchievementUseCase {
    achievementsRepository: AchievementsRepositoryImpl;

    constructor(AchievementsRepositoryImpl: AchievementsRepositoryImpl) {
        this.achievementsRepository = AchievementsRepositoryImpl;
    }

    async execute(payload: CreateAchievementPayload): Promise<Achievement | null> {
        try {
            const response = await this.achievementsRepository.create(payload);
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}