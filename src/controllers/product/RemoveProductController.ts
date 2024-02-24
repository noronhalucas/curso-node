import { Request, Response } from "express";
import { RemoveProductService } from "../../services/product/RemoveProductService";

export class RemoveProductController {
    async handle(req: Request, res: Response) {
        const productId = req.query.productId as string;
        const removeProductService = new RemoveProductService();

        const productDeleted = await removeProductService.execute({ productId });
        return res.json(productDeleted);
    }
}
