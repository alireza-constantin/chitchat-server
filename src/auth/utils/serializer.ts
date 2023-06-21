import { Services } from "@/utils/constants";
import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { IUserService } from "@/user/user";
import { User } from "@prisma/client";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(@Inject(Services.USERS) private userService: IUserService){
        super()
    }
    
    serializeUser(user: any, done: Function) {
        done(null, user)
    }
    deserializeUser(userPayload: User, done: Function) {
        const user = this.userService.findUser({ id: userPayload.id })
        return user ? done(null, user) : done(null, null)
    }

}