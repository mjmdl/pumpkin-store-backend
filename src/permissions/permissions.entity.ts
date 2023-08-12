import {User} from 'src/users/users.entity';
import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity('permissions')
export class Permission {
	static readonly nameMin = 3;
	static readonly nameMax = 30;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: Permission.nameMax})
	name: string;

	@ManyToMany(type => User, user => user.permissions)
	users: User[];
}