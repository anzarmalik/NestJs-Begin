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

  // @Column('json', { nullable: true })
  @JoinTable()
  @ManyToMany((type) => Flavour, (flavours) => flavours.coffees)
  flavours: string[];
}
