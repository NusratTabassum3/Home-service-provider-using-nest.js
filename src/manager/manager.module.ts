import { Module } from '@nestjs/common';
import { ManagerListModule } from './manager_list/manager_list.module';
import { BookingStatusModule } from './booking_status/booking_status.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ManageOrderModule } from './manage order/manage_order.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    MailerModule.forRoot({
    transport: {
    host: 'smtp.gmail.com',
    port: 465,
    ignoreTLS: true,
    secure: true,
    auth: {
    user: 'nazmul.ahammed.nz@gmail.com',
    pass: 'osadovogrgztbmqc'
    },
    }
    }),
    ManagerListModule, BookingStatusModule,ManageOrderModule],
})
export class ManagerModule {}
