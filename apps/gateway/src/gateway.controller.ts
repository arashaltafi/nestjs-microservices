import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) { }

  // USERS
  @Get('users')
  getUsers() {
    return this.gatewayService.getUsers();
  }

  @Get('users/:id')
  getUser(@Param('id') id: string) {
    return this.gatewayService.getUser(Number(id));
  }

  @Post('users')
  createUser(@Body('name') name: string) {
    return this.gatewayService.createUser(name);
  }

  // NEWS
  @Get('news')
  getNews() {
    return this.gatewayService.getNews();
  }

  @Post('news')
  createNews(@Body('title') title: string) {
    return this.gatewayService.createNews(title);
  }
}