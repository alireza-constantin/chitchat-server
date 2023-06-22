import { Body, Controller, Get, Inject, Post, Req, Res, UseGuards } from "@nestjs/common"
import { Routes, Services } from "@/utils/constants"
import { IAuthService } from "./auth"
import { CreateUserDto } from "./dto"
import { IUserService } from "@/user/user"
import { exclude } from "@/utils/helpers"
import { AuthenticatedGuard, LocalAuthGuard } from "./utils/auth.strategy"
import { Request, Response } from "express"
import { User } from "@prisma/client"

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
    login() {
        return { ok: true }
    }

    @Post("/logout")
    logout() {}

    @Get("/status")
    @UseGuards(AuthenticatedGuard)
    status(@Req() req: Request, @Res() res: Response) {
        const user = req.user as User;
        const userWithoutPassword = exclude(user, ['password'])
        res.json(req.user)
    }
}
