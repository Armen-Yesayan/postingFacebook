import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./auth.model";
import {RegisterDto} from "./dto/register.dto";
import * as bcrypt from 'bcryptjs'
import {LoginDto} from "./dto/login.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(@InjectModel(User) private userModel: typeof User,
                private jwtService: JwtService) {}

    async register(dto: RegisterDto): Promise<User> {
        const canditate = await this.getUserByEmail(dto.email);
        if (canditate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        }
        const passwordHash = await bcrypt.hash(dto.password, 5);

        return await this.userModel.create({...dto, password: passwordHash});
    }

    async login(dto: LoginDto) {
        const user = await this.validateUser(dto);

        return this.generateToken(user);
    }

    async googleLogin(req) {
        const user = await this.verify(req.body.tokenId)

        const candidate = await this.getUserByEmail(user['email']);

        if(candidate) {
            const token = await this.generateToken(candidate)

            return token
        } else {
            const passwordHash = await bcrypt.hash(user['email'] + 'secret', 5);

            const us = {
                firstName: user['given_name'],
                lastName: user['family_name'],
                email: user['email']
            }
            const people = await this.userModel.create({...us, password: passwordHash});
            return await this.generateToken(people)
        }
    }

    async facebookLogin(req) {
        const user = req.body.user
        const candidate = await this.getUserByEmail(user.email);

        if(candidate) {
            const token = await this.generateToken(candidate)
            return token
        } else {
            const passwordHash = await bcrypt.hash(user.email + 'secret', 5);
            const firstName = user.name.split(' ')[0]
            const lastName = user.name.split(' ')[1]

            const us = {
                firstName,
                lastName,
                email: user.email
            }
            const people = await this.userModel.create({...us, password: passwordHash});
            return await this.generateToken(people)
        }
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, firstName: user.firstName, lastName: user.lastName};

        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(dto: LoginDto) {
        const user = await this.getUserByEmail(dto.email);
        const passwordEquals = await bcrypt.compare(dto.password, user.password);

        if (user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({message: 'Неправильный логин или пароль'});
    }

    private async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({where: {email}});

        return user;
    }

    private async verify(token: string) {
        const decode = await this.jwtService.decode(token);

        return decode;
    }
}