import { ParcoursRepository } from "@/data/repositories/parcours.repositoryimpl";
import { Parcours } from "@/shared/entities/types/parcour.type";

type DeleteParcoursUseCaseProps = {
    id: string;
}

export class DeleteParcoursUseCase {
    private parcoursRepository: ParcoursRepository;

    constructor(parcoursRepository: ParcoursRepository) {
        this.parcoursRepository = parcoursRepository;
    }

    async execute({ id }: DeleteParcoursUseCaseProps): Promise<Parcours | null> {
        try {
            const parcours = await this.parcoursRepository.delete(id);
            return parcours;
        } catch (error) {
            console.error(`[UseCase] Error deleting parcours for id: ${id}`, error);
            return null;
        }
    }
}
