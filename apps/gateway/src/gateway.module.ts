import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.USERS_KEY,
        transport: Transport.TCP,
        options: {
          host: process.env.USERS_HOST,
          port: Number(process.env.USERS_PORT),
        },
      },
      {
        name: process.env.NEWS_KEY,
        transport: Transport.TCP,
        options: {
          host: process.env.NEWS_HOST,
          port: Number(process.env.NEWS_PORT),
        },
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule { }
