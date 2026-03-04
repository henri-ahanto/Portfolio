import { Message, MessagesPagination, CreateMessagePayload, UpdateMessagePayload } from "@/shared/entities/types/message.type";

export abstract class MessagesRepository {

    // CREATE
    abstract create(payload: CreateMessagePayload): Promise<Message>;

    // READ: Récupérer un message par son ID
    abstract findById(id: string): Promise<Message | null>;

    // READ: Tous les messages paginés
    abstract getPaginated(page: number, pageSize: number): Promise<MessagesPagination>;

    // UPDATE
    abstract update(
        id: string,
        payload: UpdateMessagePayload
    ): Promise<Message>;

    // UPDATE: Marquer un message comme lu
    abstract markRead(id: string): Promise<Message>;

    // DELETE
    abstract delete(id: string): Promise<Message>;

}
