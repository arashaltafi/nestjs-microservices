import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
};

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Arash' },
    { id: 2, name: 'John' },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((u) => u.id === id);
  }

  create(name: string) {
    const user = {
      id: this.users.length + 1,
      name,
    };
    this.users.push(user);
    return user;
  }
}