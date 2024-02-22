import prismaClient from "../../prisma";
import { IRemoveCategoryRequest } from "../../models/interfaces/category/RemoveCategoryRequest";

class RemoveCategoryService {
    async execute({ categoryId }: IRemoveCategoryRequest) {
        try {
            if (!categoryId) {
                throw new Error("Falta ID da categoria!");
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }
        if (categoryId) {
            const category = await prismaClient.category.delete({
                where: {
                    id: categoryId,
                },
            });
            return category;
        }
    }
}

export { RemoveCategoryService };
