import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Permission} from "../permission/permission-entity";

@Entity('users')
class User {
	static readonly nameMax = 50;
	static readonly nameMin = 3;
	static readonly emailMax = 100;
	static readonly emailMin = 5;
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
	permissions: Permission[];

	constructor(name: string, email: string, password: string) {
		this.name = name;
		this.email = email;
		this.password = password;
	}
}
export default User;