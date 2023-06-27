import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateMessageDto {
    @IsNotEmpty()
    @IsNumber()
    conversationId: number

    @IsNotEmpty()
    @IsString()
    message: string
}