import { User } from "@prisma/client"

export type createUser = {
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

export type FindUserDetail = Partial<{
    email: string,
    id: number
}>

export type CreateConversationsParams = {
    authorId: number,
    recipientId: number,
    message: string
}

export type CreateMessageParams = {
    text: string,
    authorId: number,
    conversationId: number
}

export interface AuthenticatedRequest extends Request {
    user: User
}