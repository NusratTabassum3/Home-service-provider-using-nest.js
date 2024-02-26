import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserListDto } from './dto/create-user-list.dto';
import { UserList } from './entities/user-list.entity';

@Injectable()
export class UserListService {
  constructor(
    @InjectRepository(UserList)
    private UserListRepo: Repository<UserList>,
    private mailerService: MailerService,
  ) {}
  create(Dto: CreateUserListDto) {
    return this.UserListRepo.save(Dto);
  }

  findAll() {
    return this.UserListRepo.find();
  }

  findOne(id: number) {
    return this.UserListRepo.findOneBy({ id });
  }

  update(id: number, Dto: CreateUserListDto) {
    return this.UserListRepo.update(id, Dto);
  }

  remove(id: number) {
    return this.UserListRepo.delete(id);
  }
  async sendEmail(mydata) {
    return await this.mailerService.sendMail({
      to: mydata.email,
      subject: mydata.subject,
      text: mydata.text,
    });
  }

  async signup(mydto) {
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(mydto.password, salt);
    const hassedcpassed = await bcrypt.hash(mydto.confirmPassword, salt);
    mydto.password = hassedpassed;
    mydto.confirmPassword = hassedcpassed;
    return this.UserListRepo.save(mydto);
  }

  async signin(mydto) {
    console.log(mydto.password);
    const mydata = await this.UserListRepo.findOneBy({ email: mydto.email });
    const isMatch = await bcrypt.compare(mydto.password, mydata.password);
    if (isMatch) {
      return 1;
    } else {
      return 0;
    }
  }
}
