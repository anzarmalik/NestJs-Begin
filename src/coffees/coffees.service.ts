import {
  Inject,
  Injectable,
  //   HttpStatus,
  //   HttpException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CoffeesEntity } from './entities/coffee.entity';
import { Event } from './entities/event.entity';

import { Flavour } from './entities/flavour.entity';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
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
    @InjectRepository(Flavour)
    private readonly flavourRepo: Repository<Flavour>,
    private readonly connection: Connection, // @Inject('name') coffeeName: string[],
  ) {}

  findAllFlavours(paginationQueryDto: PaginationQueryDto) {
    const { offset, limit } = paginationQueryDto;
    return this.coffeeRepo.find({
      relations: ['flavours'],
      skip: offset,
      take: limit,
    });
    // res.status('201').send(this.coffeeRepo.find());
  }

  async findOneFlavour(id: string) {
    const coffee = await this.coffeeRepo.findOne(id, {
      relations: ['flavours'],
    });
    if (!coffee) {
      //   throw new HttpException(
      //     `Data not found for this id ${id}`,
      //     HttpStatus.NOT_FOUND,
      //   );
      throw new NotFoundException(`Data not found for this id ${id}`);
    }
    return coffee;
  }

  async createOneFlavour(createCoffeeDto: CreateCoffeeDto) {
    const flavour = await Promise.all(
      createCoffeeDto.flavours.map((flavourName) => {
        this.preloadFlavourByName(flavourName);
      }),
    );

    const createCoffee = this.coffeeRepo.create({
      ...(createCoffeeDto as any),
      flavour,
    });
    return this.coffeeRepo.save(createCoffee);
  }

  changeHttpFlavour(name: string) {
    return `We have added new coffee flavour ${name} flavour and your http status is now `;
  }

  async updateFlavour(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavour =
      updateCoffeeDto.flavours &&
      (await Promise.all(
        updateCoffeeDto.flavours.map((flavourName) => {
          this.preloadFlavourByName(flavourName);
        }),
      ));

    const updateCoffee = await this.coffeeRepo.preload({
      id: +id,
      ...(updateCoffeeDto as any),
      flavour,
    });
    if (!updateCoffee) {
      throw new NotFoundException(`Data not found for this id ${id}`);
    }
    return this.coffeeRepo.save(updateCoffee);
  }

  async DeleteFlavour(id: string) {
    const coffee = await this.coffeeRepo.findOne(id);
    return this.coffeeRepo.remove(coffee);
  }

  private async preloadFlavourByName(name: string): Promise<Flavour> {
    const existingFlavour = await this.flavourRepo.findOne({ name });
    if (existingFlavour) {
      return existingFlavour;
    }

    return this.flavourRepo.create({ name });
  }

  private async recommendCoffee(coffee: CoffeesEntity) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      coffee.recommendations++;
      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(recommendEvent);
      await queryRunner.manager.save(coffee);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
