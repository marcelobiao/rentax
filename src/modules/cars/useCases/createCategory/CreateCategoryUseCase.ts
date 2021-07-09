import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"

interface IRequest {
    name: string,
    description: string
}

class CreateCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesRepository) {}

    async execute({name, description}: IRequest): Promise<void>{
        const categoryAlreadExists = await this.categoriesRepository.findByName(name)

        if(categoryAlreadExists) {
            throw new Error("Category already exists!")
        }

        this.categoriesRepository.create({name, description})
    }

}

export { CreateCategoryUseCase }