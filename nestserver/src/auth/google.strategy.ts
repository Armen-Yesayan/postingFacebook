import {PassportStrategy} from "@nestjs/passport";
import {Strategy, VerifyCallback} from "passport-google-oauth20";
import {config} from "dotenv";

import { Injectable } from "@nestjs/common";
config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: "240943418839-e5s9s72bb0cdr490nods5ld4euc73skk.apps.googleusercontent.com",
            clientSecret: 'd2Uh2T0QbyYFFzZ_2v94UuPN',
            callbackURL: 'http://localhost:3000/',
            scope: ['email', 'profile']
        });
    }

    async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        }

        done(null, user);
    }
}