import { MessagesRepository } from "@/data/repositories/message.repositoryimpl";
import { Message } from "@/shared/entities/types/message.type";
import { UpdateMessagePayload } from "@/shared/entities/types/message.type";

type UpdateMessageUseCaseProps = {
    id: string;
    payload: UpdateMessagePayload;
}

export class UpdateMessageUseCase {
    private messagesRepository: MessagesRepository;

    constructor(messagesRepository: MessagesRepository) {
        this.messagesRepository = messagesRepository;
    }

    async execute({ id, payload }: UpdateMessageUseCaseProps): Promise<Message | null> {
        try {
            const message = await this.messagesRepository.update(id, payload);
            return message;
        } catch (error) {
            console.error(`[UseCase] Error updating message for id: ${id}`, error);
            return null;
        }
    }
}
