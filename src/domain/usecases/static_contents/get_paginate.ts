import { StaticContentsRepository } from "@/data/repositories/static_content_repository";
import { StaticContentsPanigation } from "@/shared/entities/StaticContent";
import { DomainError } from "@/shared/errors/domainError";
import { StaticContentError } from "@/shared/errors/staticContentError";

type GetPaginateStaticContentUseCaseProps = {
    page: number;
    peer_page?: number; // Optional with default
}

export class GetPaginateStaticContentUseCase {
    private staticContentRepository: StaticContentsRepository;

    constructor(staticContentRepository: StaticContentsRepository) {
        this.staticContentRepository = staticContentRepository;
    }

    async execute({ page, peer_page = 10 }: GetPaginateStaticContentUseCaseProps): Promise<StaticContentsPanigation> {
        try {
            // Pass the arguments directly; no need for page = page inside the call
            const response = await this.staticContentRepository.getPaginated(page, peer_page);

            if (response instanceof Promise)
                throw new DomainError("Failed to fetch static contents: No response from repository.")

            return response;

        } catch (error) {
            // If it's already one of our custom errors, re-throw it to preserve the status code
            if (error instanceof StaticContentError) {
                throw error;
            }

            // Otherwise, log it and wrap generic errors
            console.error("[UseCase] Pagination Error:", error);
            throw new StaticContentError(
                error instanceof Error ? error.message : "An unexpected error occurred during pagination",
                500
            );
        }
    }
}