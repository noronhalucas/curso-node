import prismaClient from "../../prisma";
import { hash } from "bcrypt";
import { IUserRequest } from "../../models/interfaces/user/UserRequest";

class CreateUserService {
  async execute({ name, email, password }: IUserRequest) {
    if (!email) {
      throw new Error("Email não pode estar vazio!");
    }
    if (!name) {
      throw new Error("Nome não pode estar vazio!");
    }
    if (!password) {
      throw new Error("Senha não pode estar vazio!");
    }
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
        name: name,
      },
    });

    if (userAlreadyExists) {
      throw new Error("Usuario já existe!");
    }

    const passwordHash = await hash(password, 16);

    const user = prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
