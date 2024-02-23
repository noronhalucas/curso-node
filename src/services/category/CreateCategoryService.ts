import prismaClient from "../../prisma";
import { ICategoryRequest } from "../../models/interfaces/category/CategoryRequest";

class CreateCategoryService {
    async execute({ name }: ICategoryRequest) {
        try {
            if (name === "" || name === null || !name) {
                throw new Error("Nome de categoria inválido!");
            }
        } catch (error) {
            console.error(error.message);
            throw error;
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
        return category;
    }
}

export { CreateCategoryService };
