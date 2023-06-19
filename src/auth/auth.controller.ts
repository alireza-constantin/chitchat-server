import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Routes, Services } from "@/utils/types"
import { IAuthService } from './auth';
import { CreateUserDto } from './dto';

@Controller(Routes.AUTH)
export class AuthController {
    constructor(@Inject(Services.AUTH) private authService: IAuthService) {}

    @Post("/register")
    register(@Body() createUserDto: CreateUserDto) {}

    @Post("/login")
    login() {}

    @Post("/logout")
    logout() {}

    @Get("/status")
    status() {}
}
