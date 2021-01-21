import {
  Injectable,
  //   HttpStatus,
  //   HttpException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoffeesEntity } from './entities/coffee.entity';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
@Injectable()
export class CoffeesService {
  // private coffeesEntity: CoffeesEntity[] = [
  //   {
  //     id: 1,
  //     name: 'anzar',
  //     brand: 'caffene',
  //     flavours: ['black'],
  //   },
  // ];

  constructor(
    @InjectRepository(CoffeesEntity)
    private readonly coffeeRepo: Repository<CoffeesEntity>,
  ) {}

  findAllFlavours(res: any) {
    res.status('201').send(this.coffeeRepo.find());
  }

  findOneFlavour(id: string) {
    const coffee = this.coffeeRepo.findOne(id);
    if (!coffee) {
      //   throw new HttpException(
      //     `Data not found for this id ${id}`,
      //     HttpStatus.NOT_FOUND,
      //   );
      throw new NotFoundException(`Data not found for this id ${id}`);
    }
    return coffee;
  }

  createOneFlavour(createCoffeeDto: CreateCoffeeDto) {
    const createCoffee = this.coffeeRepo.create(createCoffeeDto);
    return this.coffeeRepo.save(createCoffee);
  }

  changeHttpFlavour(name: string) {
    return `We have added new coffee flavour ${name} flavour and your http status is now `;
  }

  async updateFlavour(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const updateCoffee = await this.coffeeRepo.preload({
      id: +id,
      ...updateCoffeeDto,
    });
    if (!updateCoffee) {
      throw new NotFoundException(`Data not found for this id ${id}`);
    }
    return this.coffeeRepo.save(updateCoffee);
  }

  DeleteFlavour(id: string, name: string) {
    return ` We have Deleted flavour of id ${id} namely ${name}`;
  }
}
