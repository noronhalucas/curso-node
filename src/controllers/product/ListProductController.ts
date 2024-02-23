import { Request, Response } from "express";
import { ListProductService } from "../../services/product/ListProductService";

export class ListProductController {
    async handle(req: Request, res: Response) {
        const listProductsService = new ListProductService();
        const products = await listProductsService.execute();

        return res.json(products);
    }
}
