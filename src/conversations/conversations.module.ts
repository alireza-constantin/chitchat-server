import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { Services } from '@/utils/constants';
import { MessageModule } from '@/message/message.module';

@Module({
    imports: [MessageModule],
    providers: [
        {
            provide: Services.CONVERSATIONS,
            useClass: ConversationsService,
        },
    ],
    controllers: [ConversationsController],
})
export class ConversationModule {}
