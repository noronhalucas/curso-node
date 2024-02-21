import prismaClient from "../../prisma";
import { IRemoveUserRequest } from "../../models/interfaces/RemoveUserRequest";

class RemoveUserService {
    async execute({ userId }: IRemoveUserRequest) {
        if (userId) {
            const removeUser = await prismaClient.user.delete({
                where: {
                    id: userId,
                },
            });
            return removeUser;
        }
    }
}

export { RemoveUserService };
