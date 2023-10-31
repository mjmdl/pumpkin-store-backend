import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import Product from "./product-entity";

@Entity({name: "attributes"})
export default class Attribute {
	static readonly DESCRIPTION_MIN = 5;
	static readonly DESCRIPTION_MAX = 100;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: Attribute.DESCRIPTION_MAX})
	description: string;

	@ManyToMany(() => Product, product => product.attributes)
	products: Product[];
}
