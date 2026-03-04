import { ParcoursRepository } from "@/data/repositories/parcours.repositoryimpl";
import { Parcours } from "@/shared/entities/types/parcour.type";
import { UpdateParcoursPayload } from "@/shared/entities/types/parcour.type";

type UpdateParcoursUseCaseProps = {
    id: string;
    payload: UpdateParcoursPayload;
}

export class UpdateParcoursUseCase {
    private parcoursRepository: ParcoursRepository;

    constructor(parcoursRepository: ParcoursRepository) {
        this.parcoursRepository = parcoursRepository;
    }

    async execute({ id, payload }: UpdateParcoursUseCaseProps): Promise<Parcours | null> {
        try {
            const parcours = await this.parcoursRepository.update(id, payload);
            return parcours;
        } catch (error) {
            console.error(`[UseCase] Error updating parcours for id: ${id}`, error);
            return null;
        }
    }
}
