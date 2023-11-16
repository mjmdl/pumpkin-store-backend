import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import {Product} from "../products/products-entities";

@Entity("bundles")
export class Bundle {
	static readonly NameMin = 3;
	static readonly NameMax = 50;
	static readonly DescriptionMax = 1000;
	static readonly PricePrecision = 10;
	static readonly PriceScale = 2;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: Bundle.NameMax, unique: true})
	name: string;

	@Column({type: "text"})
	description: string;

	@Column({
		type: "decimal",
		precision: Bundle.PricePrecision,
		scale: Bundle.PriceScale,
	})
	price: number;

	@ManyToMany(() => Product, product => product.bundles)
	@JoinTable({
		name: "bundles_have_products",
		joinColumn: {name: "bundle_id"},
		inverseJoinColumn: {name: "product_id"},
	})
	products: Product[];
}
