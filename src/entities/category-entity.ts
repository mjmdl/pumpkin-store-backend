import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import Product from "./product-entity";

@Entity({name: "categories"})
export default class Category {
	static readonly NAME_MIN = 3;
	static readonly NAME_MAX = 3;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: Category.NAME_MAX})
	name: string;

	@ManyToMany(() => Product, product => product.categories)
	products: Product[];
}
