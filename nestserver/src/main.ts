import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";

const start = async () => {

    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 5000;
    app.enableCors();

    await app.listen(PORT, () => console.log(`Server started on PORT - ${PORT}`));
}

start();