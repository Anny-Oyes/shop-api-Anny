import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImage } from './product-image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'numeric' })
  price: number;

  //Relaciones
  // un producto puede tener muchas imagenes 
  @OneToMany(
    () => ProductImage, // entidadad lleva en mayúscula la primer letra
    (productImage) => productImage.product, //parametro
    {
      cascade: true,
      eager: true
    })
  images?: ProductImage[];
}

