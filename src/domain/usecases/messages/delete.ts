import { MessagesRepository } from "@/data/repositories/message.repositoryimpl";
import { Message } from "@/shared/entities/types/message.type";

type DeleteMessageUseCaseProps = {
    id: string;
}

export class DeleteMessageUseCase {
    private messagesRepository: MessagesRepository;

    constructor(messagesRepository: MessagesRepository) {
        this.messagesRepository = messagesRepository;
    }

    async execute({ id }: DeleteMessageUseCaseProps): Promise<Message | null> {
        try {
            const message = await this.messagesRepository.delete(id);
            return message;
        } catch (error) {
            console.error(`[UseCase] Error deleting message for id: ${id}`, error);
            return null;
        }
    }
}
