import { CreateConversationsParams } from "@/utils/types";

export interface IConversationsService {
    createConversation(createConversationParams: CreateConversationsParams);
}