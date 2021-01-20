import {
  Injectable,
  //   HttpStatus,
  //   HttpException,
  NotFoundException,
} from '@nestjs/common';
import { CoffeesEntity } from './entities/coffee.entity';
@Injectable()
export class CoffeesService {
  private coffeesEntity: CoffeesEntity[] = [
    {
      id: 1,
      name: 'anzar',
      brand: 'caffene',
      flavours: ['black'],
    },
  ];

  findAllFlavours(res: any) {
    res.status('201').send(this.coffeesEntity);
  }

  findOneFlavour(id: string) {
    const coffee = this.coffeesEntity.find((item) => item.id === +id);
    if (!coffee) {
      //   throw new HttpException(
      //     `Data not found for this id ${id}`,
      //     HttpStatus.NOT_FOUND,
      //   );
      throw new NotFoundException(`Data not found for this id ${id}`);
    }
    return coffee;
  }

  createOneFlavour(createCoffeeDto: any): void {
    this.coffeesEntity.push(createCoffeeDto);
  }

  changeHttpFlavour(name: string) {
    return `We have added new coffee flavour ${name} flavour and your http status is now `;
  }

  updateFlavour(id: string, updateCoffeeDto: any) {
    return ` We have updated flavour of id ${id} => ${updateCoffeeDto}`;
  }

  DeleteFlavour(id: string, name: string) {
    return ` We have Deleted flavour of id ${id} namely ${name}`;
  }
}
