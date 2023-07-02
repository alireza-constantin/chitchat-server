import { PrismaService } from "@/prisma/prisma.service"
import { BadRequestException, ForbiddenException, Inject, Injectable } from "@nestjs/common"
import { IMessageService } from "./message"
import { CreateMessageParams } from "@/utils/types"
import { Message } from "@prisma/client"

@Injectable()
export class MessageService implements IMessageService {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    async createMessage({
        authorId,
        conversationId,
        text,
    }: CreateMessageParams): Promise<Message> {
        const conversation = await this.prismaService.conversation.findUnique({
            where: {
                id: conversationId
            }
        })

        if (!conversation) {
            throw new BadRequestException("Conversation not found")
        }

        console.log(authorId)
        console.log(conversation)

        if (conversation.creatorId !== authorId && conversation.recipientId !== authorId){
            throw new ForbiddenException('can not send message in this conversation')
        }
            return this.prismaService.message.create({
                data: {
                    text,
                    authorId: authorId,
                    conversationId: conversationId,
                },
            })
    }
}
