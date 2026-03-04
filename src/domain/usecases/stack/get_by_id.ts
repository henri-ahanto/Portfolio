import { StacksRepository } from "@/data/repositories/stack.repositoryimpl";
import { Stack } from "@/shared/entities/types/stack.type";

type GetByIdStackUseCaseProps = {
    id: string;
}

export class GetByIdStackUseCase {
    private stackRepository: StacksRepository;

    constructor(stackRepository: StacksRepository) {
        this.stackRepository = stackRepository;
    }

    async execute({ id }: GetByIdStackUseCaseProps): Promise<Stack | null> {
        try {
            const stack = await this.stackRepository.findById(id);
            return stack ?? null;
        } catch (error) {
            console.error(`[UseCase] Error fetching stack for id: ${id}`, error);
            throw error;
        }
    }
}
