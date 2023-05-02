import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shirts } from "./entities/shirts.entity";
import { ProductSize } from "./entities/productSize.entity";
import { SizeController } from "./sizes.controller";
import { SizeService } from "./sizes.service";

@Module({
    imports: [TypeOrmModule.forFeature([Shirts, ProductSize])],
    controllers: [SizeController],
    providers: [SizeService],
})

export class SizesModule { }