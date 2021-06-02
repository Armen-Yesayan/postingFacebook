import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {RegisterDto} from "./dto/register.dto";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";

@Controller('users')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

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
}
