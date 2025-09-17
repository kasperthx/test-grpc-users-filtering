import {
  Controller,
} from '@nestjs/common';
import {
  GetFilteredUsersRequest,
  GetFilteredUsersResponse,
  UsersServiceController,
  UsersServiceControllerMethods
} from "./generated-grpc/users";
import {request} from "express";
import {Observable} from "rxjs";
import {AppService} from "./app.service";
import {GrpcMethod} from "@nestjs/microservices";

@Controller()
@UsersServiceControllerMethods()

export class AppController implements UsersServiceController {
  constructor(
    private readonly appService: AppService,
  ) {
  }


  async getFilteredUsers(request: GetFilteredUsersRequest): Promise<GetFilteredUsersResponse>{
    const users = await this.appService.getFilteredUsers()
    return {data: users}
  }

}
