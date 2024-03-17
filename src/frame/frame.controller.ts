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
import { log } from 'console';

@Controller('frame')
export class FrameController {
  constructor(private readonly frameService: FrameService) {}

  @Post('/create')
  async createFrame(@Body() { userId, name }: CreateFrameDto) {
    return await this.frameService.create({ userId, name });
  }

  @Get()
  async findAll() {
    return await this.frameService.findAll();
  }

  @Get('/:userId')
  async findByOwnerId(@Param('userId') userId: number) {
    return await this.frameService.findByOwnerId(userId);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() { name }: CreateFrameDto) {
    return await this.frameService.update(id, { name });
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return await this.frameService.delete(id);
  }
}
