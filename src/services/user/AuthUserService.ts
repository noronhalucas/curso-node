import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IAuthRequest } from "../../models/auth/AuthRequest";
import prismaClient from "../../prisma";

class AuthUserService {
  async execute({ email, password }: IAuthRequest) {
    if (!email) {
      throw new Error("Email não pode estar vazio!");
    }
    if (!password) {
      throw new Error("Senha não pode estar vazia!");
    }

    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Usuário incorreto!");
    }

    const passwordMatch = await compare(password, user?.password);

    if (!passwordMatch) {
      throw new Error("Senha incorreta!");
    }

    const token = sign(
      {
        name: user?.name,
        email: user?.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: user?.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      token: token,
    };
  }
}

export { AuthUserService };
