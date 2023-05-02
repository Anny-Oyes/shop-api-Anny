import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateShirtDto } from "./dto/shirts.dto";
import { ProductSize } from "./entities/productSize.entity";
import { Shirts } from "./entities/shirts.entity";

@Injectable()

export class SizeService {
    constructor(
        @InjectRepository(Shirts)
        private readonly shirtRepository: Repository<Shirts>,

        @InjectRepository(ProductSize)
        private readonly sizeRepository: Repository<ProductSize>,

        private readonly dataSource: DataSource,
    ) { }

    async create(shirtDto: CreateShirtDto) {
        const { sizes = [], ...detalleProducto } = shirtDto;
        const productShirt = await this.shirtRepository.create({
            ...detalleProducto,
            sizes: sizes.map((size) => this.sizeRepository.create({ size: size }))
        })
        await this.shirtRepository.save(productShirt);
        return productShirt;
    }

    findAll() {
        return this.shirtRepository.find({
            relations: ['sizes']
        });
    }

    findOne(id: string) {
        return this.shirtRepository.findOneBy({ id });
    }

    async remove(id: string) {
        const productShirt = await this.findOne(id);
        await this.shirtRepository.remove(productShirt);
        return 'El campo se ha eliminado correctamente'
    }

    async update(id: string, cambios: CreateShirtDto) {
        const { sizes, ...updateAll } = cambios;
        const size = await this.shirtRepository.preload({
            id: id,
            ...updateAll,
        });

        const queryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        await queryRunner.connect();

        if (sizes) {
            await queryRunner.manager.delete(ProductSize, { size: { id } });

            size.sizes = sizes.map((size) => this.sizeRepository.create({ size: size }));
        } else {
            size.sizes = await this.sizeRepository.findBy({ shirts: { id } });
        }
        await queryRunner.manager.save(size);
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return size;
    }
}