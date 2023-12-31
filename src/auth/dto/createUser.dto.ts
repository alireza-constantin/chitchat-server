import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @MaxLength(32)
    password: string

    @IsNotEmpty()
    @MaxLength(32)
    firstName: string

    @IsNotEmpty()
    @MaxLength(32)
    lastName: string
}
