import { Booking } from 'src/user/booking/entities/booking.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';

@Entity('User_List')
export class UserList {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  phone: string;
  @Column()
  email: string;
  @Column()
  DOB: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  filename: string;
  @OneToMany(() => Booking, (Booking) => Booking.UserList)
  Booking: Booking[];
}
