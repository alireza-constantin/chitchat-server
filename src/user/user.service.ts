import { BadRequestException, Injectable } from "@nestjs/common"
import { IUserService } from "./user"
import { createUser } from "@/utils/types"
import { PrismaService } from "@/prisma/prisma.service"
import * as bcrypt from "bcrypt"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { User } from "@prisma/client"

@Injectable()
export class UserService implements IUserService {
    constructor(private prisma: PrismaService) {}

    async createUser(createUser: createUser): Promise<User> {
        try {
            const hashedPassword = await this.hashPassword(createUser.password)
            const user = await this.prisma.user.create({
                data: {
                    email: createUser.email,
                    firstName: createUser.firstName,
                    lastName: createUser.lastName,
                    password: hashedPassword,
                },
            })
            return user
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new BadRequestException("User with this email already exists")
                }
            }
        }
    }

    async hashPassword(rawPassword: string): Promise<string> {
        const salt = await bcrypt.genSalt()
        return bcrypt.hash(rawPassword, salt)
    }
}
