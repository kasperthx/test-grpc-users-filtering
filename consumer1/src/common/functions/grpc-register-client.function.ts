import {ProtoPackagesEnum} from "../../grpc-models/common/enums/proto-packages.enum";
import {ClientsModule, Transport} from "@nestjs/microservices";
import { ConfigModule, ConfigService } from '@nestjs/config';

export const grpcClientRegister = (options: {
  name: ProtoPackagesEnum;
  packageName: string;
  protoPath: string;
  serverUrl: string;
}) => {
  return [
    ClientsModule.registerAsync([
      {
        name: options.name,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: options.packageName,
            protoPath: options.protoPath,
            compression: 'gzip',
            url: configService.get<{url:string}>('grpcConfig')?.url ?? "localhost:8001",
            loader: {
              keepCase: true,
              longs: String,
              enums: String,
              defaults: true,
              oneofs: true,
            },
          },
        }),
      },
    ]),
  ];
};
