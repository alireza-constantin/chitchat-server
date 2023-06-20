import { Strategy } from "passport-local"
import { PassportStrategy } from "@nestjs/passport"
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common"
import { IAuthService } from "../auth"
import { Services } from "@/utils/constants"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(Services.AUTH) private authService: IAuthService) {
        super({ usernameField: 'email' })
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(email, password)
        console.log(user)
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}
