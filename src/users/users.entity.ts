import {Claim} from 'src/claims/claims.entity';
import {Shopcart} from 'src/shopcarts/shopcarts.entity';
import {Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('users')
export class User {
	static readonly nameMax = 50;
	static readonly nameMin = 3;
	static readonly emailMax = 100;
	static readonly passwordMax = 60;
	static readonly passwordMin = 8;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: User.nameMax})
	name: string;

	@Column({length: User.emailMax, unique: true})
	email: string;

	@Column({length: User.passwordMax})
	password: string;

	@ManyToMany(type => Claim, claim => claim.users)
	@JoinTable({
		name: 'users_have_claims',
		joinColumn: {name: 'user_id'},
		inverseJoinColumn: {name: 'claim_id'}
	})
	claims: Claim[];

	@OneToMany(type => Shopcart, shopcart => shopcart.buyer)
	shopcarts: Shopcart[];

	@CreateDateColumn()
	created: Date;

	@UpdateDateColumn()
	updated: Date;

	@DeleteDateColumn()
	deleted: Date;
}