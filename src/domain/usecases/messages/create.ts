import { MessagesRepository } from "@/data/repositories/message.repositoryimpl";
import { Message } from "@/shared/entities/types/message.type";
import { CreateMessagePayload } from "@/shared/entities/types/message.type";

export class CreateMessageUseCase {
    messagesRepository: MessagesRepository;

    constructor(messagesRepository: MessagesRepository) {
        this.messagesRepository = messagesRepository;
    }

    async execute(payload: CreateMessagePayload): Promise<Message | null> {
        try {
            const response = await this.messagesRepository.create(payload);
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}