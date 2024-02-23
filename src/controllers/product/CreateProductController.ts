import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";
import { IProductRequest } from "../../models/interfaces/product/ProductRequest";

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { ammount, banner, categoryId, description, name, price }: IProductRequest = req.body;
        const createProdcutService = new CreateProductService();

        try {
            if (!req.file) {
                throw new Error("Ainda não foi feito upload do arquivo!");
            } else {
                const { originalname, filename: banner } = req.file;
                const product = await createProdcutService.execute({
                    name,
                    price,
                    banner,
                    ammount,
                    categoryId,
                    description,
                });

                return res.json(product);
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
}

export { CreateProductController };
