import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductSize } from './productSize.entity';

@Entity()
export class Shirts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    brand: string;

    @Column({ type: 'text' })
    color: string;

    @Column({ type: 'numeric' })
    amount: number;

    @Column({ type: 'numeric' })
    price: number;

    @OneToMany(
        () => ProductSize,
        (productSize) => productSize.shirts,
        {
            cascade: true,
            eager: true
        })
    sizes?: ProductSize[];
}
