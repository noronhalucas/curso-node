import prismaClient from "../../prisma";
import { ICategoryRequest } from "../../models/interfaces/category/CategoryRequest";

class CreateCategoryService {
    async execute({ name }: ICategoryRequest) {
        if (name === "" || name === null || !name) {
            throw new Error("Nome de categoria inválido!");
        }

        const category = await prismaClient.category.create({
            data: {
                name: name,
            },
            select: {
                id: true,
                name: true,
            },
        });
        console.log(category)
        return category;
    }
}

export { CreateCategoryService };
