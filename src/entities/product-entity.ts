import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import Attribute from "./attribute-entity";
import Bundle from "./bundle-entity";
import Category from "./category-entity";
import Shopcart from "./shopcart-entity";

@Entity({name: "products"})
export default class Product {
	static readonly NAME_MIN = 3;
	static readonly NAME_MAX = 30;
	static readonly DESCRIPTION_MAX = 1000;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: Product.NAME_MAX})
	name: string;

	@Column({nullable: true})
	description: string;

	@Column({type: "decimal", precision: 10, scale: 2, unsigned: true})
	value: number;

	@ManyToMany(() => Category, category => category.products)
	categories: Category[];

	@ManyToMany(() => Attribute, attribute => attribute.products)
	attributes: Attribute[];

	@ManyToMany(() => Bundle, bundle => bundle.shopcarts)
	bundles: Bundle[];

	@ManyToMany(() => Shopcart, shopcarts => shopcarts.products)
	shopcarts: Shopcart[];
}
