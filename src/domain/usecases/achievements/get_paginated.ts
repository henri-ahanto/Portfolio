import { AchievementsRepositoryImpl } from "@/data/repositories/achievements.repositoryimpl";
import { AchievementsPagination } from "@/shared/entities/types/achievement.type";

type GetPaginatedAchievementsUseCaseProps = {
    page?: number;
    pageSize?: number;
}

export class GetPaginatedAchievementsUseCase {
    private achievementsRepository: AchievementsRepositoryImpl;

    constructor(achievementsRepository: AchievementsRepositoryImpl) {
        this.achievementsRepository = achievementsRepository;
    }

    async execute({ page = 1, pageSize = 10 }: GetPaginatedAchievementsUseCaseProps): Promise<AchievementsPagination> {
        try {
            const achievements = await this.achievementsRepository.getPaginated(page, pageSize);
            return achievements;
        } catch (error) {
            console.error(`[UseCase] Error fetching paginated achievements`, error);
            throw error;
        }
    }
}
