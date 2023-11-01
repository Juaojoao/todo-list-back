import { Module } from '@nestjs/common';
import { TodolistModule } from './todolist/todolist.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TodolistModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
