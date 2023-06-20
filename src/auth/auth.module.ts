import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { Services } from "@/utils/constants"
import { UserModule } from "@/user/user.module"
import { LocalStrategy } from "./utils/local.strategy"

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [
        LocalStrategy,
        {
            provide: Services.AUTH,
            useClass: AuthService,
        },
    ],
})
export class AuthModule {}
