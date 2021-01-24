import { Injectable, Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { CoffeesEntity } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';

@Injectable()
export class name {
  create() {
    return ['factory', 'name'];
  }
}

import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([CoffeesEntity, Flavour])],
  exports: [],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    name,
    {
      provide: 'nameFac',
      useFactory: (name) => name.create(),
      inject: [name],
    },
  ],
})
export class CoffeesModule {}
