import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Shirts } from "./shirts.entity";

@Entity()
export class ProductSize {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    size: string;

    @ManyToOne(
        () => Shirts,
        (shirts) => shirts.sizes, {
        onDelete: 'CASCADE',
    })
    shirts: Shirts;
}