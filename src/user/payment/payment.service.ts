import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';

import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private PaymentRepo: Repository<Payment>,
  ) {}
  create(Dto: CreatePaymentDto) {
    return this.PaymentRepo.save(Dto);
  }

  findAll() {
    return this.PaymentRepo.find();
  }

  findOne(id: number) {
    return this.PaymentRepo.findOneBy({ id });
  }

  update(id: number, Dto: CreatePaymentDto) {
    return this.PaymentRepo.update(id, Dto);
  }

  remove(id: number) {
    return this.PaymentRepo.delete(id);
  }
}
