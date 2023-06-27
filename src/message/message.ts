import { CreateMessageParams } from "@/utils/types";
import { Message } from "@prisma/client";

export interface IMessageService {
    createMessage(createMessage: CreateMessageParams): Promise<Message>;
}