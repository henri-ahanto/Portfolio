import { StaticContentsPanigation, StaticContentType } from "@/shared/entities/types/static_content.type";
import { static_contents } from "@/shared/database/prisma/generated/client";

export abstract class StaticContentsRepository {

    // CREATE: Permanent save of static content
    abstract create(key: string, type: StaticContentType, value: string): Promise<static_contents>;

    // READ: Get content by its unique key
    abstract getByKey(key: string): Promise<static_contents | null>;

    // READ: Get paginated static contents
    abstract getPaginated(page: number, pageSize: number): Promise<StaticContentsPanigation>;

    // UPDATE: Modify existing content
    abstract update(key: string, value: string): Promise<static_contents>;

    // DELETE: Permanent removal from database
    abstract delete(key: string): Promise<static_contents>;

}
