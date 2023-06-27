import { AuthenticatedGuard } from "@/auth/utils/auth.strategy"
import { Routes, Services } from "@/utils/constants"
import { AuthUser } from "@/utils/decorator"
import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common"
import { User } from "@prisma/client"
import { CreateMessageDto } from "./dto/createMessageDto"
import { IMessageService } from "./message"

@Controller(Routes.MESSAGE)
@UseGuards(AuthenticatedGuard)
export class MessageController {
    constructor(@Inject(Services.MESSAGE) private readonly messageService: IMessageService) {}

    @Post()
    createMessage(@AuthUser() user: User, @Body() createMessageDto: CreateMessageDto) {
        return this.messageService.createMessage({
            authorId: user.id,
            conversationId: createMessageDto.conversationId,
            message: createMessageDto.message,
        })
    }
}
