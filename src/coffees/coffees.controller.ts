import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';

import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get('flavours')
  //   @HttpCode(HttpStatus.GONE) here due to @Res @httpCode will not work
  findAllFlavours(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.coffeesService.findAllFlavours(paginationQueryDto);
  }

  @Get(':id')
  findOneFlavour(@Param('id', ParseIntPipe) id: string) {
    return this.coffeesService.findOneFlavour(id);
  }

  @Post()
  createOneFlavour(@Body() createCoffeeDto: CreateCoffeeDto) {
    // return `Data has been created`;
    return this.coffeesService.createOneFlavour(createCoffeeDto);
  }

  @Post('customHttpMethod')
  @HttpCode(HttpStatus.GONE)
  changeHttpFlavour(@Body('flavour') name: string) {
    return `${this.coffeesService.changeHttpFlavour(name)}  ${HttpStatus.GONE}`;
  }

  @Patch('updateFlavour/:id')
  updateFlavour(
    @Param('id') id: string,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeesService.updateFlavour(id, updateCoffeeDto);
  }

  @Delete('DeleteFlavour/:id')
  DeleteFlavour(@Param('id') id: string) {
    return this.coffeesService.DeleteFlavour(id);
  }
}
