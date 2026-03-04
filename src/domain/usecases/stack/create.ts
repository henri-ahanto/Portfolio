import { StacksRepository } from "@/data/repositories/stack.repositoryimpl";
import { Stack } from "@/shared/entities/types/stack.type";
import { CreateStackPayload } from "@/shared/entities/types/stack.type";

export class CreateStackUseCase {
    private stackRepository: StacksRepository;

    constructor(stackRepository: StacksRepository) {
        this.stackRepository = stackRepository;
    }

    async execute(payload: CreateStackPayload): Promise<Stack | null> {
        try {
            const response = await this.stackRepository.create(payload);
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
