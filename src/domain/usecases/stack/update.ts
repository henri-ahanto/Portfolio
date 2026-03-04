import { StacksRepository } from "@/data/repositories/stack.repositoryimpl";
import { Stack } from "@/shared/entities/types/stack.type";
import { UpdateStackPayload } from "@/shared/entities/types/stack.type";

type UpdateStackUseCaseProps = {
    id: string;
    payload: UpdateStackPayload;
}

export class UpdateStackUseCase {
    private stackRepository: StacksRepository;

    constructor(stackRepository: StacksRepository) {
        this.stackRepository = stackRepository;
    }

    async execute({ id, payload }: UpdateStackUseCaseProps): Promise<Stack | null> {
        try {
            const stack = await this.stackRepository.update(id, payload);
            return stack;
        } catch (error) {
            console.error(`[UseCase] Error updating stack for id: ${id}`, error);
            return null;
        }
    }
}
