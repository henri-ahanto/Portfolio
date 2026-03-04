import { StaticContentsRepository } from "@/data/repositories/static_content.repositoryimpl";
import { StaticContent } from "@/shared/entities/StaticContent";
import { StaticContentType } from "@/shared/entities/types/static_content.type";


type CreateStaticContentUseCaseProps = {
    key: string,
    type: StaticContentType,
    value: string,
}
export class CreateStaticContentUseCase {

    staticContentRepository: StaticContentsRepository
    constructor(
        staticContentRepository: StaticContentsRepository
    ) {
        this.staticContentRepository = staticContentRepository
    }

    async execute({ key, type, value }: CreateStaticContentUseCaseProps): Promise<StaticContent | null> {
        try {

            const existingStaticContent = await this.staticContentRepository.getByKey(key)
            console.log(existingStaticContent)
            if (existingStaticContent)
                throw new Error('This key is already used')

            const response = await this.staticContentRepository.create(key, type, value)
            return response;

        } catch (error) {
            console.log(error)
            return null
        }
    }
}