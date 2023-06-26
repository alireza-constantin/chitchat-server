import { CreateConversationsParams } from "@/utils/types"
import { Injectable, NotFoundException } from "@nestjs/common"
import { IConversationsService } from "./conversations"
import { PrismaService } from "@/prisma/prisma.service"
import { Conversation } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

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

        // check to see if the conversation already exists, if it is just create a message not another conversation
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

    async findConversaionById(id: number) {
        try {
            const conversation = await this.prismaService.conversation.findFirstOrThrow({
                where: {
                    id: id,
                },
                include: {
                    messages: true,
                    recipinet: {
                        select: {
                            email: true,
                            firstName: true,
                            lastName: true
                        }
                    }
                }
            })
            return conversation
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if (error.code === "P2025"){
                    throw new NotFoundException("Conversation Not Found")
                } else {
                    console.log(error)
                }
            } else {
                console.log(error)
            }
        }
        
    }

}
