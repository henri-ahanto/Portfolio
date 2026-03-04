import { ParcoursRepository } from "@/data/repositories/parcours.repositoryimpl";
import { Parcours } from "@/shared/entities/types/parcour.type";

type GetPinnedParcoursUseCaseProps = {
    limit?: number;
}

export class GetPinnedParcoursUseCase {
    private parcoursRepository: ParcoursRepository;

    constructor(parcoursRepository: ParcoursRepository) {
        this.parcoursRepository = parcoursRepository;
    }

    async execute({ limit = 6 }: GetPinnedParcoursUseCaseProps): Promise<Parcours[]> {
        try {
            const parcours = await this.parcoursRepository.getPinned(limit);
            return parcours;
        } catch (error) {
            console.error(`[UseCase] Error fetching pinned parcours`, error);
            throw error;
        }
    }
}
