import {
	Column,
	Entity,
	ManyToMany,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import User from "./user-entity";
import Bundle from "./bundle-entity";
import Product from "./product-entity";
import Purchase from "./purchase.entity";

@Entity({name: "shopcarts"})
export default class Shopcart {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({name: "total_value", type: "decimal", precision: 10, scale: 2})
	totalValue: number;

	@ManyToOne(() => User, user => user.shopcarts)
	customer: User;

	@ManyToMany(() => Product, product => product.shopcarts)
	products: Product[];

	@ManyToMany(() => Bundle, bundle => bundle.shopcarts)
	bundles: Bundle[];

	@OneToOne(() => Purchase, purchase => purchase.shopcart)
	purchase: Purchase;
}
