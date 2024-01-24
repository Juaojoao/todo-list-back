import { Module } from '@nestjs/common';
import { TodolistModule } from './todolist/todolist.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtAuthGuard } from './auth/guards/jwt.auth.guards';
import { APP_GUARD } from '@nestjs/core';
import { FrameModule } from './frame/frame.module';
import { ActivitiesListModule } from './activities-list/activities-list.module';
import { CardModule } from './card/card.module';
import { TaskListModule } from './task-list/task-list.module';

@Module({
  imports: [TodolistModule, AuthModule, UserModule, FrameModule, ActivitiesListModule, CardModule, TaskListModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
