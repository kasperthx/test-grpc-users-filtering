import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {ProtoPackagesEnum} from "./grpc-models/common/enums/proto-packages.enum";
import {ClientGrpc} from "@nestjs/microservices";
import {
  GetFilteredUsersRequest,
  GetFilteredUsersResponse,
  USERS_SERVICE_NAME,
  UsersServiceClient
} from "./generated-grpc/users";
import {firstValueFrom, Observable} from "rxjs";

@Injectable()
export class AppService implements OnModuleInit {
  private usersServiceClient: UsersServiceClient;

  constructor(
    @Inject(ProtoPackagesEnum.USER_PACKAGE)
    private readonly client: ClientGrpc,
  ) {
  }

  async onModuleInit() {
    this.usersServiceClient =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);

    const users = await firstValueFrom(
      this.getFilteredUsers({})
    )
    console.log(`Filtered users:`,users.data);
  }
  
  getFilteredUsers(request: GetFilteredUsersRequest): Observable<GetFilteredUsersResponse> {
    return this.usersServiceClient.getFilteredUsers(request);
  }
}
