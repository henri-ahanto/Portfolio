import { StacksRepository } from "@/data/repositories/stack.repositoryimpl";
import { Stack } from "@/shared/entities/types/stack.type";

type DeleteStackUseCaseProps = {
    id: string;
}

export class DeleteStackUseCase {
    private stackRepository: StacksRepository;

    constructor(stackRepository: StacksRepository) {
        this.stackRepository = stackRepository;
    }

    async execute({ id }: DeleteStackUseCaseProps): Promise<Stack | null> {
        try {
            const stack = await this.stackRepository.delete(id);
            return stack;
        } catch (error) {
            console.error(`[UseCase] Error deleting stack for id: ${id}`, error);
            return null;
        }
    }
}
