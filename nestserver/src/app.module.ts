import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { AuthModule } from './auth/auth.module';
import {User} from "./auth/auth.model";

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'node_react_auth',
            models: [User],
            autoLoadModels: true,
        }),
        AuthModule,
    ]
})
export class AppModule{}