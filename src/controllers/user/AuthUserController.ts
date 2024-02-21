import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";
import { IAuthRequest } from "../../models/auth/AuthRequest";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password }: IAuthRequest = req.body;
    const authUserRequest = new AuthUserService();
    const auth = await authUserRequest.execute({
      email,
      password,
    });

    return res.json(auth);
  }
}

export { AuthUserController };
