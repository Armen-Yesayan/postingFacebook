import {HttpService, Injectable} from '@nestjs/common';
import {map} from "rxjs/operators";

@Injectable()
export class FacebookService {

    constructor(private httpService: HttpService) {}

    async createPost(req) {
        const accessToken = await this.getAccessToken(req.access_token)

        console.log(accessToken)
    }

    getAccessToken(token) {
        return this.httpService
            .get(``, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .pipe(
                map(response => {
                    console.log(response)

                    return response.data
                })
            );
    }
}
