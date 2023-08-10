import {Category} from 'src/categories/categories.entity';
import {Skin} from 'src/skins/skins.entity';
import {Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('closets')
export class Closet {
	static readonly nameMax = 30;
	static readonly nameMin = 3;

	@PrimaryGeneratedColumn()
	id: Number;

	@Column({length: Closet.nameMax})
	name: string;

	@Column({type: 'money'})
	price: number;

	@ManyToOne(type => Category, category => category.closets)
	@JoinColumn({name: 'category_id'})
	category: Category;

	@ManyToMany(type => Skin, skin => skin.closets)
	skins: Skin[];

	@CreateDateColumn()
	created: Date;

	@UpdateDateColumn()
	updated: Date;

	@DeleteDateColumn()
	deleted: Date;
}