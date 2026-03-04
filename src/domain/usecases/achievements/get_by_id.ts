import { AchievementsRepositoryImpl } from "@/data/repositories/achievements.repositoryimpl";
import { Achievement } from "@/shared/entities/types/achievement.type";

type GetByIdAchievementUseCaseProps = {
    id: string;
}

export class GetByIdAchievementUseCase {
    private achievementsRepository: AchievementsRepositoryImpl;

    constructor(achievementsRepository: AchievementsRepositoryImpl) {
        this.achievementsRepository = achievementsRepository;
    }

    async execute({ id }: GetByIdAchievementUseCaseProps): Promise<Achievement | null> {
        try {
            const achievement = await this.achievementsRepository.findById(id);
            return achievement ?? null;
        } catch (error) {
            console.error(`[UseCase] Error fetching achievement for id: ${id}`, error);
            throw error;
        }
    }
}
