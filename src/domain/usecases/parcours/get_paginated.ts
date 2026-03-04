import { ParcoursRepository } from "@/data/repositories/parcours.repositoryimpl";
import { ParcoursPagination } from "@/shared/entities/types/parcour.type";

type GetPaginatedParcoursUseCaseProps = {
    page?: number;
    pageSize?: number;
}

export class GetPaginatedParcoursUseCase {
    private parcoursRepository: ParcoursRepository;

    constructor(parcoursRepository: ParcoursRepository) {
        this.parcoursRepository = parcoursRepository;
    }

    async execute({ page = 1, pageSize = 10 }: GetPaginatedParcoursUseCaseProps): Promise<ParcoursPagination> {
        try {
            const parcours = await this.parcoursRepository.getPaginated(page, pageSize);
            return parcours;
        } catch (error) {
            console.error(`[UseCase] Error fetching paginated parcours`, error);
            throw error;
        }
    }
}
