import prismaClient from "../../prisma";

export class ListProductService {
    async execute() {
        const products = await prismaClient.product.findMany({
            select: {
                productId: true,
                name: true,
                ammount: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return products;
    }
}
