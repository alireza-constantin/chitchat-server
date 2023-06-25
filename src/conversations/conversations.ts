import { CreateConversationsParams } from "@/utils/types";

interface IConversationsService {
    createConversation(createConversationParams: CreateConversationsParams);
}