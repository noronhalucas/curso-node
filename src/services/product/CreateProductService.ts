import { IProductRequest } from "../../models/interfaces/product/ProductRequest";
import prismaClient from "../../prisma";

class CreateProductService {
    async execute({ ammount, banner, categoryId, description, name, price }: IProductRequest) {
        const product = await prismaClient.product.create({
            data: {
                name: name,
                price: price,
                description: description,
                banner: banner,
                ammount: Number(ammount),
                categoryId: categoryId,
            },
        });

        return product;
    }
}

export { CreateProductService };
