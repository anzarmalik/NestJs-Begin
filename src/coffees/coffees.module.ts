import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { CoffeesEntity } from './entities/coffee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([CoffeesEntity])],
  exports: [],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
