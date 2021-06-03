import {Controller, Get, Post, Req} from '@nestjs/common';
import {FacebookService} from "./facebook.service";

@Controller('facebook')
export class FacebookController {

    constructor(private readonly fbService: FacebookService) {}

    @Post('/create-post')
    createPost(@Req() req) {
        return this.fbService.createPost(req);
    }

}
