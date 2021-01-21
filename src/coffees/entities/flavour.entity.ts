import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CoffeesEntity } from './coffee.entity';
@Entity()
export class Flavour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => CoffeesEntity, (coffees) => coffees.flavours)
  coffees: string[];
}
