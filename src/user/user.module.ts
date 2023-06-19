import { Module } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserController } from "./user.controller"
import { Services } from "@/utils/constants"

@Module({
    providers: [
        {
            provide: Services.USERS,
            useClass: UserService,
        },
    ],
    controllers: [UserController],
    exports: [
        {
            provide: Services.USERS,
            useClass: UserService,
        },
    ],
})
export class UserModule {}
