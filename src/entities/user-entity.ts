import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	ViewColumn,
	ViewEntity,
} from "typeorm";
import Role from "./role-entity";
import Shopcart from "./shopcart-entity";

@Entity({name: "users"})
export default class User {
	static readonly NAME_MAX = 30;
	static readonly NAME_MIN = 3;
	static readonly EMAIL_MAX = 100;
	static readonly EMAIL_MIN = 5;
	static readonly PASSWORD_LENGTH = 60;
	static readonly PASSWORD_MAX = 16;
	static readonly PASSWORD_MIN = 8;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: User.NAME_MAX})
	name: string;

	@Column({length: User.EMAIL_MAX, unique: true})
	email: string;

	@Column({length: User.PASSWORD_LENGTH})
	password: string;

	@ManyToOne(() => Role, role => role.users)
	role: Role;

	@OneToMany(() => Shopcart, shopcart => shopcart.customer)
	shopcarts: Shopcart[];
}
