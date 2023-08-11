import {User} from 'src/users/users.entity';
import {Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('claims')
export class Claim {
	static readonly nameMin = 3;
	static readonly nameMax = 30;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: Claim.nameMax})
	name: string;

	@ManyToMany(type => User, user => user.claims)
	users: User[];
}