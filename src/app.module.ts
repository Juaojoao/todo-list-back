import { Module } from '@nestjs/common';
import { TodolistModule } from './todolist/todolist.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TodolistModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
