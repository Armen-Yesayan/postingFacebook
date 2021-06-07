import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {RegisterDto} from "./dto/register.dto";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {JwtAuthGuard} from "./jwt-auth.guard";

@Controller('users')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    hello() {
        return "Hello";
    }

    @Post('/register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('/login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }

    @Post('/google-login')
    googleAuth(@Req() req) {
        return this.authService.googleLogin(req);
    }

    @Post('/facebook-login')
    facebookAuth(@Req() req) {
        return this.authService.facebookLogin(req);
    }

    @Post('/refresh-token')
    refreshToken(@Req() req) {
        return this.authService.refreshToken(req);
    }
}
