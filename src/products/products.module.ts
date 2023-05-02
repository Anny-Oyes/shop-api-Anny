import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsController } from "./products.controller";
import { ProductService } from "./products.service";
import { ProductImage } from "./entities/product-image.entity";
import { Product } from "./entities/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Product, ProductImage])],
    controllers: [ProductsController],
    providers: [ProductService],
})

export class ProductsModule{}