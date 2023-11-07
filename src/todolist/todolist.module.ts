import { Module } from '@nestjs/common';
import { TodolistController } from './todolist.controller';
import { TodolistService } from './todolist.service';
import { PrismaService } from 'src/database/prismaService';

@Module({
  controllers: [TodolistController],
  providers: [TodolistService, PrismaService],
  imports: [],
  exports: [TodolistService],
})
export class TodolistModule {}
