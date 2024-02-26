import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { SalaryService } from './salary.service';

@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @UsePipes(new ValidationPipe())
  @Post('/insert')
  create(@Body() createSalaryDto: CreateSalaryDto) {
    return this.salaryService.create(createSalaryDto);
  }
  @UsePipes(new ValidationPipe())
  @Get('/get')
  findAll() {
    return this.salaryService.findAll();
  }
  @UsePipes(new ValidationPipe())
  @Get('/get/:id')
  findOne(@Param('id') id: string) {
    return this.salaryService.findOne(+id);
  }
  @UsePipes(new ValidationPipe())
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateSalaryDto: CreateSalaryDto) {
    return this.salaryService.update(+id, updateSalaryDto);
  }
  @UsePipes(new ValidationPipe())
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.salaryService.remove(+id);
  }
}
