import {Injectable} from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import {UserDto} from "./generated-grpc/users";

@Injectable()
export class AppService {
  async getFilteredUsers(): Promise<UserDto[]> {
    console.log()
    const usersFile = path.join(process.cwd(), "src/data/users.json");


    const data = fs.readFileSync(usersFile, "utf-8");
    const users: UserDto[] = JSON.parse(data);

    return users.filter((u) => u.age > 18);
  }
}
