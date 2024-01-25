import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FrameService } from './frame.service';
import { CreateFrameDto } from './dto/create-frame.dto';

@Controller('frame')
export class FrameController {
  constructor(private readonly frameService: FrameService) {}

  @Post()
  async createFrame(@Body() data: CreateFrameDto) {
    return await this.frameService.create(data);
  }

  @Get()
  async findAll() {
    return await this.frameService.findAll();
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() data: CreateFrameDto) {
    return await this.frameService.update(id, data);
  }

  @Delete('/delete/:id/:userId')
  async delete(@Param('id') id: number, @Param('userId') userId: number) {
    return await this.frameService.delete(id, userId);
  }
}
