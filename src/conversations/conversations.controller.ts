import { AuthenticatedGuard } from '@/auth/utils/auth.strategy';
import { Routes, Services } from '@/utils/constants';
import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { CreateConversationDto } from './dto/createConversation.dto';
import { IConversationsService } from './conversations';

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticatedGuard)
export class ConversationsController {
    constructor(@Inject(Services.CONVERSATIONS) private conversationService: IConversationsService ){}
    
    @Post('/conversation')
    createConversation(@Body() createConversationDto: CreateConversationDto){
        this.conversationService.createConversation(createConversationDto)
    }
}
