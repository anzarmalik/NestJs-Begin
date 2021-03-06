import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Flavour } from './flavour.entity';
@Entity()
export class CoffeesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  // @Column('json', { nullable: true })
  @JoinTable()
  @ManyToMany((type) => Flavour, (flavours) => flavours.coffees, {
    cascade: true,
  })
  flavours: Flavour[];
}
