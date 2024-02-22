import { Request, Response } from "express";
import { RemoveCategoryService } from "../../services/category/RemoveCategoryService";

class RemoveCategoryController {
    async handle(req: Request, res: Response) {
        const categoryId = req.query.categoryId as string;
        const removeCategoryService = new RemoveCategoryService();
        const category = removeCategoryService.execute({ categoryId });
        return res.json({ message: "Categoria excluida com sucesso!" });
    }
}

export { RemoveCategoryController };
