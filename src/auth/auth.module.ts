import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { Services } from "@/utils/constants"
import { UserModule } from "@/user/user.module"
import { LocalStrategy } from "./utils/local.strategy"
import { SessionSerializer } from "./utils/serializer"

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [
        SessionSerializer,
        LocalStrategy,
        {
            provide: Services.AUTH,
            useClass: AuthService,
        },
    ],
})
export class AuthModule {}
