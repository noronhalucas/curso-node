import { Request, Response } from "express";
import { IUserRequest } from "../../models/interfaces/user/UserRequest";
import { CreateUserService } from "../../services/user/Createuserservice";

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password }: IUserRequest = req.body;
        const createUserService = new CreateUserService();
        const user = await createUserService.execute({
            name,
            email,
            password,
        });
        return res.json(user);
    }
}

export { CreateUserController };
