import { Module } from '@nestjs/common';
import { ActivitiesListService } from './activities-list.service';
import { ActivitiesListController } from './activities-list.controller';

@Module({
  controllers: [ActivitiesListController],
  providers: [ActivitiesListService],
})
export class ActivitiesListModule {}
