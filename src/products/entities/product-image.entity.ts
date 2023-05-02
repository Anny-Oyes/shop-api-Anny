import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductImage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    //Relaciones
    // uMuchas imagenes pueden ser de un producto

    @ManyToOne(
        () => Product,
        (product) => product.images, {
        onDelete: 'CASCADE',
    })
    product: Product;
}