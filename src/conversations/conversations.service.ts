import { CreateConversationsParams } from '@/utils/types';
import { Injectable } from '@nestjs/common';
import { IConversationsService } from './conversations';

@Injectable()
export class ConversationsService implements IConversationsService {
    createConversation(createConversationDetails: CreateConversationsParams) {
        
    }
}
