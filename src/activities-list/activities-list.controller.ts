import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivitiesListService } from './activities-list.service';
import { CreateActivitiesListDto } from './dto/create-activities-list.dto';
import { UpdateActivitiesListDto } from './dto/update-activities-list.dto';

@Controller('activities-list')
export class ActivitiesListController {
  constructor(private readonly activitiesListService: ActivitiesListService) {}

  @Post()
  create(@Body() createActivitiesListDto: CreateActivitiesListDto) {
    return this.activitiesListService.create(createActivitiesListDto);
  }

  @Get()
  findAll() {
    return this.activitiesListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivitiesListDto: UpdateActivitiesListDto) {
    return this.activitiesListService.update(+id, updateActivitiesListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesListService.remove(+id);
  }
}
