import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/Createuserservice";
import { IUserRequest } from "../../models/interfaces/UserRequest";

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
