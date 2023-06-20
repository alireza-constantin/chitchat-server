import { Body, Controller, Get, Inject, Post, UseGuards } from "@nestjs/common"
import { Routes, Services } from "@/utils/constants"
import { IAuthService } from "./auth"
import { CreateUserDto } from "./dto"
import { IUserService } from "@/user/user"
import { exclude } from "@/utils/helpers"
import { LocalAuthGuard } from "./utils/auth.strategy"

@Controller(Routes.AUTH)
export class AuthController {
    constructor(
        @Inject(Services.AUTH) private authService: IAuthService,
        @Inject(Services.USERS) private userService: IUserService
    ) {}

    @Post("/register")
    async register(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.createUser(createUserDto)
        const userWithoutPassword = exclude(user, ['password'])
        return userWithoutPassword
    }

    @Post("/login")
    @UseGuards(LocalAuthGuard)
    login() {}

    @Post("/logout")
    logout() {}

    @Get("/status")
    status() {}
}
