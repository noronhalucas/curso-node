import { Request, Response } from "express";
import { ICategoryRequest } from "../../models/interfaces/category/CategoryRequest";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController {
    async handle(req: Request, res: Response) {
        const { name }: ICategoryRequest = req.body;
        const createCategoryService = new CreateCategoryService();
        const category = await createCategoryService.execute({ name });
        return res.json(category);
    }
}

export { CreateCategoryController };
