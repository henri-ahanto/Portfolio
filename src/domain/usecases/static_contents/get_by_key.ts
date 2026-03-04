import { StaticContentsRepository } from "@/data/repositories/static_content_repository";
import { static_contents } from "@/shared/database/prisma/generated/client";

type GetByKeyStaticContentUseCaseProps = {
    key: string;
}

export class GetByKeyStaticContentUseCase {
    private staticContentRepository: StaticContentsRepository;

    constructor(staticContentRepository: StaticContentsRepository) {
        this.staticContentRepository = staticContentRepository;
    }

    async execute({ key }: GetByKeyStaticContentUseCaseProps): Promise<static_contents | null> {
        try {
            const content = await this.staticContentRepository.getByKey(key);

            return content ?? null;
        } catch (error) {
            console.error(`[UseCase] Error fetching static content for key: ${key}`, error);
            throw error;
        }
    }
}