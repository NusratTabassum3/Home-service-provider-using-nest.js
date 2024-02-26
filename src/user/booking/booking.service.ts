import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookngRepo: Repository<Booking>,
  ) {}
  create(createBookingDto: CreateBookingDto) {
    return this.bookngRepo.save(createBookingDto);
  }

  findAll() {
    return this.bookngRepo.find();
  }

  findOne(id: number) {
    return this.bookngRepo.findOneBy({ id });
  }

  update(id: number, createBookingDto: CreateBookingDto) {
    return this.bookngRepo.update(id, createBookingDto);
  }

  remove(id: number) {
    return this.bookngRepo.delete(id);
  }
}
