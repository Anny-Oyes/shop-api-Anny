import { Body, Controller, Get, Post, Patch, ParseUUIDPipe } from "@nestjs/common";
import { Delete, Param } from "@nestjs/common/decorators";
import { CreateProductDto } from "./dto/product.dto";
import { ProductService } from "./products.service";

@Controller('productos')

export class ProductsController {
    constructor (
        private readonly productServiceRepo: ProductService
    ){}
        @Post()
        create(@Body() productoDto: CreateProductDto){
            return this.productServiceRepo.create(productoDto);
    }

    // MÉTODO PARA VER TODOS LOS PRODUCTROS

    @Get()
    findAll(){
        return this.productServiceRepo.findAll();
    }

    //método para visualizar un producto especifico

    @Get(':id')
    findOne(
        @Param('id', ParseUUIDPipe) id: string) {
            return this.productServiceRepo.findOne(id);
        }

    //método para eliminar

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.productServiceRepo.remove(id);
    }

    //método para actualizar el producto

    @Patch(':id')
    update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateProductDto: CreateProductDto
    ){
      return this.productServiceRepo.update(id, updateProductDto);
    }
  }
    //path actualiza parcialmente
    //param y body