import { ParcoursRepository } from "@/data/repositories/parcours.repositoryimpl";
import { Parcours } from "@/shared/entities/types/parcour.type";

type GetByIdParcoursUseCaseProps = {
    id: string;
}

export class GetByIdParcoursUseCase {
    private parcoursRepository: ParcoursRepository;

    constructor(parcoursRepository: ParcoursRepository) {
        this.parcoursRepository = parcoursRepository;
    }

    async execute({ id }: GetByIdParcoursUseCaseProps): Promise<Parcours | null> {
        try {
            const parcours = await this.parcoursRepository.findById(id);
            return parcours ?? null;
        } catch (error) {
            console.error(`[UseCase] Error fetching parcours for id: ${id}`, error);
            throw error;
        }
    }
}
