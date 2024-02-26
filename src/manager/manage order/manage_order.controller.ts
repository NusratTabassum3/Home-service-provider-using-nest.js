import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SessionGuard } from 'src/user/user-list/session.guard';
import { CreateBookingStatusDto } from '../booking_status/dto/create-booking_status.dto';

import { ManageOrderService } from './manage_order.service';
@UseGuards(new SessionGuard())
@Controller('manageOrder')
export class ManageOrderController {
  constructor(private readonly manageOrderService: ManageOrderService) {}

  @Get('/get')
  findAll() {
    return this.manageOrderService.findOrder();
  }

  @Get('/get/:id')
  findOne(@Param('id') id: string) {
    return this.manageOrderService.findOneOrder(+id);
  }

  @Put('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updateManageOrderDto: CreateBookingStatusDto,
  ) {
    return this.manageOrderService.updateOrder(+id, updateManageOrderDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.manageOrderService.removeOrder(+id);
  }
}
