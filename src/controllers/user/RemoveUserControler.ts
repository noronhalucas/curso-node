import { Request, Response } from "express";
import { RemoveUserService } from "../../services/user/RemoveUserService";

class RemoveUserController {
    async handle(req: Request, res: Response) {
        const userId = req?.query.userId as string;
        const removeUserService = new RemoveUserService();
        const removeUser = removeUserService.execute({ userId });
        return res.json(removeUser);
    }
}

export { RemoveUserController };
