import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Services } from '@/utils/constants';
import { ConversationModule } from '@/conversations/conversations.module';

@Module({
    controllers: [MessageController],
    providers: [{
        provide: Services.MESSAGE,
        useClass: MessageService
    }],
    exports: [{
        provide: Services.MESSAGE,
        useClass: MessageService
    }]
})
export class MessageModule {}
