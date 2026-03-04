import { MessagesRepository } from "@/data/repositories/message.repositoryimpl";
import { MessagesPagination } from "@/shared/entities/types/message.type";

type GetPaginatedMessagesUseCaseProps = {
    page?: number;
    pageSize?: number;
}

export class GetPaginatedMessagesUseCase {
    private messagesRepository: MessagesRepository;

    constructor(messagesRepository: MessagesRepository) {
        this.messagesRepository = messagesRepository;
    }

    async execute({ page = 1, pageSize = 10 }: GetPaginatedMessagesUseCaseProps): Promise<MessagesPagination> {
        try {
            const messages = await this.messagesRepository.getPaginated(page, pageSize);
            return messages;
        } catch (error) {
            console.error(`[UseCase] Error fetching paginated messages`, error);
            throw error;
        }
    }
}
