import {  ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './auth';
import { Services } from '@/utils/constants';
import { IUserService } from '@/user/user';
import { compareHashText } from '@/utils/helpers';
import { User } from '@prisma/client';

@Injectable()
export class AuthService implements IAuthService {
    constructor(@Inject(Services.USERS) private userService: IUserService){}

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findUser({ email })
        if(!user) throw new ForbiddenException('Invalide Credentials')
        const isPasswordValid = await compareHashText(password, user.password)
        if (!isPasswordValid) throw new ForbiddenException("Invalide Credentials")
        return user;
    }
}
