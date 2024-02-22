import prismaClient from "../../prisma";
import { hash } from "bcrypt";
import { IUserRequest } from "../../models/interfaces/user/UserRequest";

class CreateUserService {
    async execute({ name, email, password }: IUserRequest) {
        try {
            if (!email) {
                throw new Error("400: Email não pode estar vazio!");
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }

        try {
            if (!name) {
                throw new Error("400: Nome não pode estar vazio!");
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }

        try {
            if (!password) {
                throw new Error("400: Senha não pode estar vazia!");
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email,
                name: name,
            },
        });

        try {
            if (userAlreadyExists) {
                throw new Error("400: Usuário já existe!");
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }

        const passwordHash = await hash(password, 16);

        const user = await prismaClient.user.create({
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
