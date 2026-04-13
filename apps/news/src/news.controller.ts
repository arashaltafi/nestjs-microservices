import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NewsService } from './news.service';

@Controller()
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @MessagePattern({ cmd: 'get_news' })
  getNews() {
    return this.newsService.findAll();
  }

  @MessagePattern({ cmd: 'create_news' })
  createNews(@Payload() title: string) {
    return this.newsService.create(title);
  }
}