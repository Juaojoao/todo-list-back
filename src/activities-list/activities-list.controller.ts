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
  async create(@Body() { name, frameId }: CreateActivitiesListDto) {
    return await this.activitiesListService.create({ name, frameId });
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() { name }: CreateActivitiesListDto,
  ) {
    return await this.activitiesListService.update(id, { name });
  }

  @Get('/get/:id')
  async getAll(@Param('frameId') frameId: number) {
    return await this.activitiesListService.getAll(frameId);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return this.activitiesListService.delete(id);
  }
}
