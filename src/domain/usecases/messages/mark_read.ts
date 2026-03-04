import { MessagesRepository } from "@/data/repositories/message.repositoryimpl";
import { Message } from "@/shared/entities/types/message.type";

type MarkReadMessageUseCaseProps = {
    id: string;
}

export class MarkReadMessageUseCase {
    private messagesRepository: MessagesRepository;

    constructor(messagesRepository: MessagesRepository) {
        this.messagesRepository = messagesRepository;
    }

    async execute({ id }: MarkReadMessageUseCaseProps): Promise<Message | null> {
        try {
            const message = await this.messagesRepository.markRead(id);
            return message;
        } catch (error) {
            console.error(`[UseCase] Error marking message as read for id: ${id}`, error);
            return null;
        }
    }
}
