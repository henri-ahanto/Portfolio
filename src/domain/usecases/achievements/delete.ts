import { AchievementsRepositoryImpl } from "@/data/repositories/achievements.repositoryimpl";
import { Achievement } from "@/shared/entities/types/achievement.type";

type DeleteAchievementUseCaseProps = {
    id: string;
}

export class DeleteAchievementUseCase {
    private achievementsRepository: AchievementsRepositoryImpl;

    constructor(achievementsRepository: AchievementsRepositoryImpl) {
        this.achievementsRepository = achievementsRepository;
    }

    async execute({ id }: DeleteAchievementUseCaseProps): Promise<Achievement | null> {
        try {
            const achievement = await this.achievementsRepository.delete(id);
            return achievement;
        } catch (error) {
            console.error(`[UseCase] Error deleting achievement for id: ${id}`, error);
            return null;
        }
    }
}
