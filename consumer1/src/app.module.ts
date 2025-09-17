import { ConfigModule } from '@nestjs/config';
import config from './common/config';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import {grpcClientRegister} from "./common/functions/grpc-register-client.function";
import {ProtoPackagesEnum} from "./grpc-models/common/enums/proto-packages.enum";
import {USERS_PACKAGE_NAME} from "./generated-grpc/users";

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true, load: [config] }), ...grpcClientRegister({
    name: ProtoPackagesEnum.USER_PACKAGE,
    packageName: USERS_PACKAGE_NAME,
    protoPath: 'src/grpc-models/proto/users.proto',
    serverUrl: 'localhost:8001',
  }),],
  providers: [AppService],
})
export class AppModule {}
