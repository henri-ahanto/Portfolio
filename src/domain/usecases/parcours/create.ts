import { ParcoursRepository } from "@/data/repositories/parcours.repositoryimpl";
import { Parcours } from "@/shared/entities/types/parcour.type";
import { CreateParcoursPayload } from "@/shared/entities/types/parcour.type";

export class CreateParcoursUseCase {
    private parcoursRepository: ParcoursRepository;

    constructor(parcoursRepository: ParcoursRepository) {
        this.parcoursRepository = parcoursRepository;
    }

    async execute(payload: CreateParcoursPayload): Promise<Parcours | null> {
        try {
            const response = await this.parcoursRepository.create(payload);
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
