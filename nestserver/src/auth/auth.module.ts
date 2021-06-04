import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./model/auth.model";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'secret_key',
            signOptions: {
                expiresIn: '6h'
            }
        })
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}