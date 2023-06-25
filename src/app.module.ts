import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./auth/auth.module"
import { UserModule } from "./user/user.module"
import { PrismaModule } from "./prisma/prisma.module"
import { PassportModule } from "@nestjs/passport"
import { ConversationModule } from './conversations/conversations.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        UserModule,
        PrismaModule,
        PassportModule.register({ session: true }),
        ConversationModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
