import prismaClient from "../../prisma";
import { IEditProductRequest } from "../../models/interfaces/product/EditProductRequest";

class EditProductService {
    async execute({ ammount, banner, description, name, price, productId }: IEditProductRequest) {
        const productEdited = await prismaClient.product.update({
            where: {
                productId: productId,
            },
            data: {
                name: name,
                ammount: Number(ammount),
                banner: banner,
                price: price,
                description: description,
            },
        });
        return productEdited;
    }
}

export { EditProductService };
