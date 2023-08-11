import {Category} from 'src/categories/categories.entity';
import {Shopcart} from 'src/shopcarts/shopcarts.entity';
import {Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('skins')
export class Skin {
	static readonly nameMax = 50;
	static readonly nameMin = 3;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: Skin.nameMax})
	name: string;

	@Column({type: 'text'})
	description: string;

	@Column({type: 'money'})
	price: number;

	@ManyToOne(type => Category, category => category.skins)
	@JoinColumn({name: 'category_id'})
	category: Category;

	@ManyToMany(type => Shopcart, shopcart => shopcart.skins)
	shopcarts: Shopcart[];
}