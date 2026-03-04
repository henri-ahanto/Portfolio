import { AchievementsRepositoryImpl } from "@/data/repositories/achievements.repositoryimpl";
import { Achievement } from "@/shared/entities/types/achievement.type";

type GetPinnedAchievementsUseCaseProps = {
    limit?: number;
}

export class GetPinnedAchievementsUseCase {
    private achievementsRepository: AchievementsRepositoryImpl;

    constructor(achievementsRepository: AchievementsRepositoryImpl) {
        this.achievementsRepository = achievementsRepository;
    }

    async execute({ limit = 6 }: GetPinnedAchievementsUseCaseProps): Promise<Achievement[]> {
        try {
            const achievements = await this.achievementsRepository.getPinned(limit);
            return achievements;
        } catch (error) {
            console.error(`[UseCase] Error fetching pinned achievements`, error);
            throw error;
        }
    }
}
