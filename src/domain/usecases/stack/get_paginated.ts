import { StacksRepository } from "@/data/repositories/stack.repositoryimpl";
import { StacksPagination } from "@/shared/entities/types/stack.type";

type GetPaginatedStacksUseCaseProps = {
    page?: number;
    pageSize?: number;
}

export class GetPaginatedStacksUseCase {
    private stackRepository: StacksRepository;

    constructor(stackRepository: StacksRepository) {
        this.stackRepository = stackRepository;
    }

    async execute({ page = 1, pageSize = 10 }: GetPaginatedStacksUseCaseProps): Promise<StacksPagination> {
        try {
            const stacks = await this.stackRepository.getPaginated(page, pageSize);
            return stacks;
        } catch (error) {
            console.error(`[UseCase] Error fetching paginated stacks`, error);
            throw error;
        }
    }
}
