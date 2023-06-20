import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./auth/auth.module"
import { UserModule } from "./user/user.module"
import { PrismaModule } from "./prisma/prisma.module"
import { PassportModule } from "@nestjs/passport"

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        UserModule,
        PrismaModule,
        PassportModule.register({ session: true }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
