import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateProductDto } from "./dto/product.dto";
import { ProductImage } from "./entities/product-image.entity";
import { Product } from "./entities/product.entity";

@Injectable()

export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly ProductRepository: Repository<Product>,

        @InjectRepository(ProductImage)
        private readonly imageRepository: Repository<ProductImage>,

        private readonly dataSource: DataSource,
    ) { }

    //método para agregar producto...

    // async create(productoDto: CreateProductDto) {
    //     const product = this.ProductRepository.create(productoDto);
    //     await this.ProductRepository.save(product);

    //     return product;
    // }

    async create(productoDto: CreateProductDto) {
        const { images = [], ...detalleProducto } = productoDto;
        const product = await this.ProductRepository.create({
            ...detalleProducto,
            images: images.map((image) => this.imageRepository.create({ url: image }))
        })
        await this.ProductRepository.save(product);
        return product;
    }

    //método para visualizar todos los productos

    findAll() {
        return this.ProductRepository.find({
            relations: ['images']
        });
    }

    //método para visualizar un producto especifico

    findOne(id: string) {
        return this.ProductRepository.findOneBy({ id });
    }

    //método para remover un producto especifico

    async remove(id: string) {
        const product = await this.findOne(id);
        await this.ProductRepository.remove(product);
        return 'Producto eliminado sastifactoriamente'
    }

    //método para actualiar un producto
    // async update(id: string, cambios: CreateProductDto) {
    //     const findProduct = await this.findOne(id);
    //     const updatedProducto = await this.ProductRepository.merge(
    //       findProduct,
    //       cambios,
    //     );

    //     return this.ProductRepository.save(updatedProducto);
    //   }
    // }

    async update(id: string, cambios: CreateProductDto) {
        const { images, ...updateAll } = cambios;
        const product = await this.ProductRepository.preload({
            id: id,
            ...updateAll,
        });

        //consultar a la base de datos para modificarla
        const queryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        await queryRunner.connect();

        //Si vienen nuevas imagenes que se eliminen las anteriores

        if (images) {
            await queryRunner.manager.delete(ProductImage, { product: { id } });

            product.images = images.map((image) => this.imageRepository.create({ url: image }));
        } else {
            product.images = await this.imageRepository.findBy({ product: { id } });
        }
        await queryRunner.manager.save(product);
        await queryRunner.commitTransaction(); //se hace los cambios
        await queryRunner.release() //Le dice que ya a finalizado
        return product;
    }
}