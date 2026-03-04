import { AchievementsRepositoryImpl } from "@/data/repositories/achievements.repositoryimpl";
import { Achievement } from "@/shared/entities/types/achievement.type";
import { UpdateAchievementPayload } from "@/shared/entities/types/achievement.type";

type UpdateAchievementUseCaseProps = {
    id: string;
    payload: UpdateAchievementPayload;
}

export class UpdateAchievementUseCase {
    private achievementsRepository: AchievementsRepositoryImpl;

    constructor(achievementsRepository: AchievementsRepositoryImpl) {
        this.achievementsRepository = achievementsRepository;
    }

    async execute({ id, payload }: UpdateAchievementUseCaseProps): Promise<Achievement | null> {
        try {
            const achievement = await this.achievementsRepository.update(id, payload);
            return achievement;
        } catch (error) {
            console.error(`[UseCase] Error updating achievement for id: ${id}`, error);
            return null;
        }
    }
}
