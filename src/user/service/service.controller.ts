import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Put, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { SessionGuard } from '../user-list/session.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServiceService } from './service.service';
@UseGuards(new SessionGuard())
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}
  @UsePipes(new ValidationPipe())
  @Post('insert')
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }
  @UsePipes(new ValidationPipe())
  @Get('/get')
  findAll() {
    return this.serviceService.findAll();
  }
  @UsePipes(new ValidationPipe())
  @Get('/get/:id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.serviceService.findOne(+id);
  }
  @UsePipes(new ValidationPipe())
  @Put('/update/:id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateServiceDto: CreateServiceDto,
  ) {
    return this.serviceService.update(+id, updateServiceDto);
  }
  @UsePipes(new ValidationPipe())
  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.serviceService.remove(+id);
  }
}
