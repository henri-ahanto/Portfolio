import { StaticContentsRepository } from "@/data/repositories/static_content.repositoryimpl";
import { StaticContentError } from "@/shared/errors/static_content.error";

type DeleteStaticContentUseCaseProps = {
    key: string;
}

export class DeleteStaticContentUseCase {
    private staticContentRepository: StaticContentsRepository;

    constructor(staticContentRepository: StaticContentsRepository) {
        this.staticContentRepository = staticContentRepository;
    }

    /**
     * Executes the permanent removal of a static content record.
     */
    async execute({ key }: DeleteStaticContentUseCaseProps): Promise<void> {
        // 1. Validation
        if (!key) {
            throw new StaticContentError("A key is required to perform a deletion.", 400);
        }

        try {
            // 2. Existence Check
            // We check first to provide a meaningful 404 error instead of a generic 500
            const exists = await this.staticContentRepository.getByKey(key);
            if (!exists) {
                throw new StaticContentError(`Deletion failed: Content with key "${key}" does not exist.`, 404);
            }

            // 3. Permanent Deletion
            await this.staticContentRepository.delete(key);

        } catch (error) {
            // 4. Error Mapping
            if (error instanceof StaticContentError) {
                throw error;
            }

            console.error(`[DeleteUseCase Error] Failed to delete key: ${key}`, error);
            throw new StaticContentError(
                error instanceof Error ? error.message : "Internal server error during deletion.",
                500
            );
        }
    }
}