import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class GatewayService {
  constructor(
    @Inject(process.env.USERS_KEY) private usersClient: ClientProxy,
    @Inject(process.env.NEWS_KEY) private newsClient: ClientProxy,
  ) { }

  getUsers() {
    return this.usersClient.send({ cmd: 'get_users' }, {});
  }

  getUser(id: number) {
    return this.usersClient.send({ cmd: 'get_user' }, id);
  }

  createUser(name: string) {
    return this.usersClient.send({ cmd: 'create_user' }, name);
  }

  getNews() {
    return this.newsClient.send({ cmd: 'get_news' }, {});
  }

  createNews(title: string) {
    return this.newsClient.send({ cmd: 'create_news' }, title);
  }
}