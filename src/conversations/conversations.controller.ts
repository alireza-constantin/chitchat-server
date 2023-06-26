import { AuthenticatedGuard } from "@/auth/utils/auth.strategy"
import { Routes, Services } from "@/utils/constants"
import { Body, Controller, Get, Inject, Param, Post, UseGuards } from "@nestjs/common"
import { CreateConversationDto } from "./dto/createConversation.dto"
import { IConversationsService } from "./conversations"
import { AuthUser } from "@/utils/decorator"
import { User } from "@prisma/client"

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticatedGuard)
export class ConversationsController {
    constructor(
        @Inject(Services.CONVERSATIONS) private conversationService: IConversationsService
    ) {}

    @Post()
    createConversation(
        @AuthUser() user: User,
        @Body() createConversationDto: CreateConversationDto
    ) {
        return this.conversationService.createConversation({
            authorId: user.id,
            message: createConversationDto.message,
            recipientId: createConversationDto.recipientId,
        })
    }


    @Get(':id')
    findConversationById(@Param("id") id: number){
        // console.log(id)
        return this.conversationService.findConversaionById(Number(id))
    }
}
