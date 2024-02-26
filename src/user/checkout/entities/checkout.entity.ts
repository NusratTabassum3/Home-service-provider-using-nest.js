import { Booking } from 'src/user/booking/entities/booking.entity';
import { Payment } from 'src/user/payment/entities/payment.entity';
import { Report } from 'src/user/report/entities/report.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Checkout')
export class Checkout {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  destination: string;
  @Column()
  time: string;
  @ManyToOne(() => Booking, (Booking) => Booking.Checkout)
  Booking: Booking;
  @OneToMany(() => Payment, (Payment) => Payment.Checkout)
  Payment: Payment[];
  @OneToMany(() => Report, (Report) => Report.Checkout)
  Report: Report[];
}
