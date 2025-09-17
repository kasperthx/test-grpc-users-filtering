import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {USERS_PACKAGE_NAME} from "./generated-grpc/users";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.GRPC,
      options: {
        package: [
          USERS_PACKAGE_NAME
        ],
        protoPath: [
          'src/grpc-models/proto/users.proto',
        ],
        url: process.env.GRPC_BIND_URL ?? "0.0.0.0:8001"
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();

}
bootstrap();
