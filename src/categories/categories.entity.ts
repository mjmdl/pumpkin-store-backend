import {Skin} from 'src/skins/skins.entity';
import {Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('categories')
export class Category {
	static readonly nameMin = 3;
	static readonly nameMax = 30;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: Category.nameMax})
	name: string;

	@OneToMany(type => Skin, skin => skin.category)
	skins: Skin[];
}