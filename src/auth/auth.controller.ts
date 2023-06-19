import { Body, Controller, Get, Inject, Post } from "@nestjs/common"
import { Routes, Services } from "@/utils/constants"
import { IAuthService } from "./auth"
import { CreateUserDto } from "./dto"
import { IUserService } from "@/user/user"

@Controller(Routes.AUTH)
export class AuthController {
    constructor(
        @Inject(Services.AUTH) private authService: IAuthService,
        @Inject(Services.USERS) private userService: IUserService
    ) {}

    @Post("/register")
    register(@Body() createUserDto: CreateUserDto) {
        this.userService.createUser(createUserDto)
    }

    @Post("/login")
    login() {}

    @Post("/logout")
    logout() {}

    @Get("/status")
    status() {}
}
