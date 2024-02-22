import { Request, Response, json } from "express";
import { EditCategoryService } from "../../services/category/EditCategoryService";

class EditCategoryController {
    async handle(req: Request, res: Response) {
        const { name } = req.body;
        const categoryId = req.query.categoryId as string;
        const editCategoryService = new EditCategoryService();
        const editedCategory = editCategoryService.execute({ name, categoryId });
        return res.json(editedCategory);
    }
}

export { EditCategoryController };
