import { CreateConversationsParams } from "@/utils/types";
import { Conversation, Message } from "@prisma/client";

export interface IConversationsService {
    createConversation(createConversationParams: CreateConversationsParams): Promise<Conversation | Message>;
    findConversaionById(id: number);
}