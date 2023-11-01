import { Module } from '@nestjs/common';
import { TodolistModule } from './todolist/todolist.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TodolistModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
