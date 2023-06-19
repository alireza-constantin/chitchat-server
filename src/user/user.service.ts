import { Injectable } from '@nestjs/common';
import { IUserService } from './user';
import { createUser } from '@/utils/types';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UserService implements IUserService {
    constructor(private prisma: PrismaService){}
    createUser(user: createUser) {
        this.prisma.user.findFirst()
    }
}
