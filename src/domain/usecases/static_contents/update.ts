import { StaticContentsRepository } from "@/data/repositories/static_content_repository";
import { static_contents } from "@/shared/database/prisma/generated/client";
import { StaticContentError } from "@/shared/errors/staticContentError";

type UpdateStaticContentUseCaseProps = {
    key: string;
    value: string;
}

export class UpdateStaticContentUseCase {
    private staticContentRepository: StaticContentsRepository;

    constructor(staticContentRepository: StaticContentsRepository) {
        this.staticContentRepository = staticContentRepository;
    }

    /**
     * Executes the permanent update of a static content record.
     */
    async execute({ key, value }: UpdateStaticContentUseCaseProps): Promise<static_contents> {
        // 1. Basic Validation
        if (!key) throw new StaticContentError("A valid key is required for updates.", 400);

        try {
            // 2. Check if the record exists before updating (Optional but recommended)
            const exists = await this.staticContentRepository.getByKey(key);
            if (!exists) {
                throw new StaticContentError(`Content with key "${key}" not found.`, 404);
            }

            // 3. Orchestrate the permanent update
            const updatedContent = await this.staticContentRepository.update(key, value);

            return updatedContent;

        } catch (error) {
            // 4. Handle known errors or bubble up Repository errors
            if (error instanceof StaticContentError) {
                throw error;
            }

            console.error(`[UpdateUseCase Error] Key: ${key}`, error);
            throw new StaticContentError(
                error instanceof Error ? error.message : "Internal server error during update.",
                500
            );
        }
    }
}