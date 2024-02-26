import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private ReportRepo: Repository<Report>,
  ) {}
  create(Dto: CreateReportDto) {
    return this.ReportRepo.save(Dto);
  }

  findAll() {
    return this.ReportRepo.find();
  }

  findOne(id: number) {
    return this.ReportRepo.findOneBy({ id });
  }

  update(id: number, Dto: CreateReportDto) {
    return this.ReportRepo.update(id, Dto);
  }

  remove(id: number) {
    return this.ReportRepo.delete(id);
  }
}
