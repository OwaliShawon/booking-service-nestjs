import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Service } from '../../services/entities/service.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  phone: string;

  @Column()
  schedule: Date;

  @Column({ default: 'Pending' })
  status: string;

  @ManyToOne(() => Service)
  @JoinColumn()
  service: Service;
}
