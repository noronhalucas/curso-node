import prismaClient from "../../prisma";
import { ISaleProductRequest } from "../../models/interfaces/sale/SaleProductRequest";

export class SaleProductService {
    async execute({ ammount, productId }: ISaleProductRequest) {
        try {
            if (!productId || !ammount) {
                throw new Error("Dados do produto é necessário para realizar alterações!");
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }

        const queryProduct = await prismaClient.product.findFirst({
            where: {
                productId: productId,
            },
        });

        try {
            if (queryProduct?.ammount > ammount && ammount == 0) {
                const newAmmount = queryProduct?.ammount - ammount;
                const saveSale = await prismaClient.product.update({
                    where: {
                        productId: productId,
                    },
                    data: {
                        ammount: newAmmount,
                    },
                    select: {
                        productId: true,
                        name: true,
                        ammount: true,
                    },
                });

                return saveSale;
            } else {
                throw new Error("Não foi possivel executar a operação!");
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
}
