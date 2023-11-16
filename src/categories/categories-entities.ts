import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Product} from "../products/products-entities";

@Entity("categories")
export class Category {
	static readonly NameMin = 3;
	static readonly NameMax = 30;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: Category.NameMax, unique: true})
	name: string;

	@OneToMany(() => Product, product => product.category)
	products: Product[];
}
