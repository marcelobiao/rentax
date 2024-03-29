import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'
import "reflect-metadata"
import { inject, injectable } from 'tsyringe'

interface IRequest {
    name: string,
    description: string
}

@injectable()
class CreateCategoryUseCase {

    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute({name, description}: IRequest): Promise<void>{
        const categoryAlreadExists = await this.categoriesRepository.findByName(name)

        if(categoryAlreadExists) {
            throw new Error('Category already exists!')
        }

        this.categoriesRepository.create({name, description})
    }

}

export { CreateCategoryUseCase }