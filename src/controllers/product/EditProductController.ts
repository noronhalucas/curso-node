import { Request, Response } from "express";
import { IEditProductRequest } from "../../models/interfaces/product/EditProductRequest";
import { EditProductService } from "../../services/product/EditProductService";

class EditProductController {
    async handle(req: Request, res: Response) {
        const { ammount, banner, description, name, price, productId }: IEditProductRequest = req.body;
        const editProductService = new EditProductService();

        const productEdited = editProductService.execute({
            ammount,
            banner,
            description,
            name,
            price,
            productId,
        });

        return res.json(productEdited);
    }
}

export { EditProductController };
