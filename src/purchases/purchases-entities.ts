import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	ManyToMany,
	JoinTable,
	BeforeInsert,
} from "typeorm";
import {Product} from "../products/products-entities";
import {User} from "../users/users-entities";

@Entity("purchases")
export class Purchase {
	static readonly TotalValuePrecision = 10;
	static readonly TotalValueScale = 2;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "decimal",
		precision: Purchase.TotalValuePrecision,
		scale: Purchase.TotalValueScale,
	})
	totalValue: number;

	@ManyToOne(() => User, user => user.purchases)
	@JoinColumn({name: "user_id"})
	user: User;

	@ManyToMany(() => Product, product => product.purchases)
	@JoinTable({
		name: "purchases_have_products",
		joinColumn: {name: "purchase_id"},
		inverseJoinColumn: {name: "product_id"},
	})
	products: Product[];

	@BeforeInsert()
	calculateTotalValue() {
		this.totalValue = 0;
		for (const prod of this.products) {
			this.totalValue += Number(prod.price);
		}
	}
}
