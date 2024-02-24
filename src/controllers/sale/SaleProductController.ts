import { Request, Response } from "express";
import { SaleProductService } from "../../services/sale/SaleProductService";
import { ISaleProductRequest } from "../../models/interfaces/sale/SaleProductRequest";

export class SaleProductController {
    async handle(req: Request, res: Response) {
        const productId = req.query.productId as string;
        const { ammount }: ISaleProductRequest = req.body;
        const saleProductService = new SaleProductService();

        const saleProduct = await saleProductService.execute({ productId, ammount });
        return res.json(saleProduct);
    }
}
