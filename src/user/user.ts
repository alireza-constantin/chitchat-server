import { createUser } from "@/utils/types";
import { User } from "@prisma/client";

export interface IUserService {
    createUser(createUser: createUser): Promise<User>
}