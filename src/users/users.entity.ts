import {Permission} from 'src/permissions/permissions.entity';
import {Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ViewEntity} from 'typeorm';

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

	@ManyToMany(type => Permission, permission => permission.users)
	@JoinTable({
		name: 'users_permissions',
		joinColumn: {name: 'user_id'},
		inverseJoinColumn: {name: 'permission_id'}
	})
	permissions: Permission[];
}
