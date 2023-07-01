import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./auth/auth.module"
import { UserModule } from "./user/user.module"
import { PrismaModule } from "./prisma/prisma.module"
import { PassportModule } from "@nestjs/passport"
import { ConversationModule } from './conversations/conversations.module';
import { GatewayModule } from './gateway/gateway.module';
import { EventEmitterModule } from '@nestjs/event-emitter'

@Module({
    imports: [
        ConfigModule.forRoot(),
        EventEmitterModule.forRoot(),
        AuthModule,
        UserModule,
        ConversationModule,
        PrismaModule,
        PassportModule.register({ session: true }),
        GatewayModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
