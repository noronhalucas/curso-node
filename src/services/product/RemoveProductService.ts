import prismaClient from "../../prisma";
import { IRemoveProduct } from "../../models/interfaces/product/RemoveProductRequest";

export class RemoveProductService {
    async execute({ productId }: IRemoveProduct) {
        try {
            if (!productId) {
                throw new Error("ID do produto não pode estar vazio!");
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }

        const removeProduct = await prismaClient.product.delete({
            where: {
                productId: productId,
            },
        });

        return removeProduct;
    }
}
