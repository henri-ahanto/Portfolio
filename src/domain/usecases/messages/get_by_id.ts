import { MessagesRepository } from "@/data/repositories/message.repositoryimpl";
import { Message } from "@/shared/entities/types/message.type";

type GetByIdMessageUseCaseProps = {
    id: string;
}

export class GetByIdMessageUseCase {
    private messagesRepository: MessagesRepository;

    constructor(messagesRepository: MessagesRepository) {
        this.messagesRepository = messagesRepository;
    }

    async execute({ id }: GetByIdMessageUseCaseProps): Promise<Message | null> {
        try {
            const message = await this.messagesRepository.findById(id);
            return message ?? null;
        } catch (error) {
            console.error(`[UseCase] Error fetching message for id: ${id}`, error);
            throw error;
        }
    }
}
