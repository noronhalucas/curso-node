import prismaClient from "../../prisma";
import { IEditCategoryRequest } from "../../models/interfaces/category/EditCategoryRequest";

class EditCategoryService {
    async execute({ categoryId, name }: IEditCategoryRequest) {
        try {
            if (categoryId === null || name === null || !categoryId || !name) {
                throw new Error("Falta argumentos para editar a categoria!");
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }

        const categoryEdited = prismaClient.category.update({
            where: {
                id: categoryId,
            },
            data: {
                name: name,
            },
        });

        return categoryEdited;
    }
}

export { EditCategoryService };
