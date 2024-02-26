import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { Checkout } from './entities/checkout.entity';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(Checkout)
    private checkoutRepo: Repository<Checkout>,
  ) {}
  create(Dto: CreateCheckoutDto) {
    return this.checkoutRepo.save(Dto);
  }

  findAll() {
    return this.checkoutRepo.find();
  }

  findOne(id: number) {
    return this.checkoutRepo.findOneBy({ id });
  }

  update(id: number, Dto: CreateCheckoutDto) {
    return this.checkoutRepo.update(id, Dto);
  }

  remove(id: number) {
    return this.checkoutRepo.delete(id);
  }
}
