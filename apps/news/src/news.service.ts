import { Injectable } from '@nestjs/common';

export type News = {
  id: number;
  title: string;
};

@Injectable()
export class NewsService {
  private news: News[] = [
    { id: 1, title: 'NestJS Microservices Released' },
    { id: 2, title: 'Node.js 22 Updates' },
  ];

  findAll() {
    return this.news;
  }

  create(title: string) {
    const item = {
      id: this.news.length + 1,
      title,
    };
    this.news.push(item);
    return item;
  }
}