import { Injectable } from '@nestjs/common';
import { CreateActivitiesListDto } from './dto/create-activities-list.dto';
import { UpdateActivitiesListDto } from './dto/update-activities-list.dto';

@Injectable()
export class ActivitiesListService {
  create(createActivitiesListDto: CreateActivitiesListDto) {
    return 'This action adds a new activitiesList';
  }

  findAll() {
    return `This action returns all activitiesList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activitiesList`;
  }

  update(id: number, updateActivitiesListDto: UpdateActivitiesListDto) {
    return `This action updates a #${id} activitiesList`;
  }

  remove(id: number) {
    return `This action removes a #${id} activitiesList`;
  }
}
