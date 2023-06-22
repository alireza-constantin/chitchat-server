import { User } from "@prisma/client";

export interface IAuthService {
    validateUser(email: string, passport: string): Promise<User>;
}