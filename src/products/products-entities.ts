import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, ManyToMany} from "typeorm";
import {Bundle} from "../bundles/bundles-entities";
import {Purchase} from "../purchases/purchases-entities";
import {Category} from "../categories/categories-entities";

@Entity("products")
export class Product {
	static readonly NameMin = 3;
	static readonly NameMax = 50;
	static readonly DescriptionMax = 1000;
	static readonly PricePrecision = 10;
	static readonly PriceScale = 2;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: Product.NameMax})
	name: string;

	@Column({type: "text"})
	description: string;

	@Column({
		type: "decimal",
		precision: Product.PricePrecision,
		scale: Product.PriceScale,
	})
	price: number;

	@ManyToOne(() => Category, category => category.products)
	@JoinColumn({name: "category_id"})
	category: Category;

	@ManyToMany(() => Bundle, bundle => bundle.products)
	bundles: Bundle[];

	@ManyToMany(() => Purchase, purchase => purchase.products)
	purchases: Purchase[];

	@OneToMany(() => ProductImage, image => image.product)
	images: ProductImage[];
}

@Entity("product_images")
export class ProductImage {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({type: "bytea", nullable: false})
	image: Buffer;

	@ManyToOne(() => Product, product => product.images, {nullable: true})
	@JoinColumn({name: "product_id"})
	product?: Product;
}
