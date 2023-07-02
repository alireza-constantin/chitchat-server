import { AuthenticatedGuard } from "@/auth/utils/auth.strategy"
import { Routes, Services } from "@/utils/constants"
import { AuthUser } from "@/utils/decorator"
import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common"
import { User } from "@prisma/client"
import { CreateMessageDto } from "./dto/createMessageDto"
import { IMessageService } from "./message"
import { EventEmitter2 } from "@nestjs/event-emitter"

@Controller(Routes.MESSAGE)
@UseGuards(AuthenticatedGuard)
export class MessageController {
    constructor(@Inject(Services.MESSAGE) private readonly messageService: IMessageService, 
    private readonly eventEmitter: EventEmitter2) {}

    @Post()
    async createMessage(@AuthUser() user: User, @Body() createMessageDto: CreateMessageDto) {
        const msg = await this.messageService.createMessage({
            authorId: user.id,
            conversationId: createMessageDto.conversationId,
            text: createMessageDto.text,
        })

        this.eventEmitter.emit('message.create', msg)
        return msg
    }
}
