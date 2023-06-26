import type { CreateConversationsParams } from "@/utils/types"
import type { IConversationsService } from "./conversations"
import type { Conversation } from "@prisma/client"
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "@/prisma/prisma.service"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

@Injectable()
export class ConversationsService implements IConversationsService {
    constructor(private readonly prismaService: PrismaService) {}

    async createConversation(createConversationDetails: CreateConversationsParams) {
        const { authorId, message, recipientId } = createConversationDetails
        try {
            const existingConversation = await this.prismaService.conversation.findFirst({
                where: {
                    OR: [
                        {
                            creatorId: authorId,
                            recipientId: recipientId,
                        },
                        {
                            recipientId: authorId,
                            creatorId: recipientId,
                        },
                    ],
                },
            })

            // check to see if the conversation already exists, if it is just create a message not another conversation
            if (existingConversation) {
                return await this.prismaService.message.create({
                    data: {
                        text: message,
                        authorId: authorId,
                        conversationId: existingConversation.id,
                    },
                })
            }

            return await this.prismaService.conversation.create({
                data: {
                    creatorId: authorId,
                    recipientId: recipientId,
                    messages: {
                        create: {
                            text: message,
                            authorId: authorId,
                        },
                    },
                },
            })
        } catch (error) {
            // check too see if the recipient user does not exist throw an error
            if (error instanceof PrismaClientKnownRequestError) {
                if (
                    error.code === "P2003" &&
                    error.meta.field_name === "Conversation_recipientId_fkey (index)"
                ) {
                    throw new BadRequestException(
                        `User with id of ${recipientId} does not exists to start a conversation with`
                    )
                } else {
                    console.log(error)
                }
            } else {
                console.log(error)
            }
        }
    }

    async findConversationById(conversationId: number): Promise<Conversation> {
        try {
            return await this.prismaService.conversation.findFirstOrThrow({
                where: {
                    id: conversationId,
                },
                include: {
                    messages: true,
                    recipinet: {
                        select: {
                            email: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    throw new NotFoundException("Conversation Not Found")
                } else {
                    console.log(error)
                }
            } else {
                console.log(error)
            }
        }
    }

    getAllUserConversations(userId: number): Promise<Conversation[]> {
        return this.prismaService.conversation.findMany({
            where: {
                creatorId: userId,
            },
        })
    }
}
