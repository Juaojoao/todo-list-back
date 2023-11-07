import { Module } from '@nestjs/common';
import { TodolistModule } from './todolist/todolist.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtAuthGuard } from './auth/guards/jwt.auth.guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TodolistModule, AuthModule, UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
