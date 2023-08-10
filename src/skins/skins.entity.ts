import {Category} from 'src/categories/categories.entity';
import {Closet} from 'src/closets/closets.entity';
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

	@ManyToOne(type => Category, category => category.skins)
	@JoinColumn({name: 'category_id'})
	category: Category;

	@ManyToMany(type => Closet, closet => closet.skins)
	closets: Closet[];

	@CreateDateColumn()
	created: Date;

	@UpdateDateColumn()
	updated: Date;

	@DeleteDateColumn()
	deleted: Date;
}