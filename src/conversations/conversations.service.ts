import { CreateConversationsParams } from "@/utils/types"
import { Injectable } from "@nestjs/common"
import { IConversationsService } from "./conversations"
import { PrismaService } from "@/prisma/prisma.service"

@Injectable()
export class ConversationsService implements IConversationsService {
    constructor(private readonly prismaService: PrismaService) {}

    async createConversation(createConversationDetails: CreateConversationsParams) {
        const existingConversation = await this.prismaService.conversation.findFirst({
            where: {
                OR: [
                    {
                        creatorId: createConversationDetails.authorId,
                        recipientId: createConversationDetails.recipientId,
                    },
                    {
                        recipientId: createConversationDetails.authorId,
                        creatorId: createConversationDetails.recipientId,
                    },
                ],
            },
        })

        // check to see if the conversation already existed just create a message not another conversation
        if(existingConversation){
            return this.prismaService.message.create({
                data: {
                    text: createConversationDetails.message,
                    authorId: createConversationDetails.authorId,
                    conversationId: existingConversation.id
                }
            })
        }

        return this.prismaService.conversation.create({
            data: {
                creatorId: createConversationDetails.authorId,
                recipientId: createConversationDetails.recipientId,
                messages: {
                    create: {
                        text: createConversationDetails.message,
                        authorId: createConversationDetails.authorId
                    }
                }
            }
        })
    }
}
