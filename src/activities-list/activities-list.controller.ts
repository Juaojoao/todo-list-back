import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { ActivitiesListService } from './activities-list.service';
import { CreateActivitiesListDto } from './dto/create-activities-list.dto';

@Controller('activitieslist')
export class ActivitiesListController {
  constructor(private readonly activitiesListService: ActivitiesListService) {}

  @Post('/create')
  async create(@Body() data: CreateActivitiesListDto) {
    return await this.activitiesListService.create(data);
  }

  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() data: CreateActivitiesListDto) {
    return await this.activitiesListService.update(id, data);
  }

  @Get('/get')
  async getAll() {
    return await this.activitiesListService.getAll();
  }

  @Delete('/delete/:id/:frameId')
  async delete(@Param('id') id: number, @Param('frameId') frameId: number) {
    return this.activitiesListService.delete(id, frameId);
  }
}
