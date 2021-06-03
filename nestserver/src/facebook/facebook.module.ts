import {HttpModule, Module} from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { FacebookController } from './facebook.controller';

@Module({
  imports: [
      HttpModule
  ],
  providers: [FacebookService],
  controllers: [FacebookController]
})
export class FacebookModule {}
