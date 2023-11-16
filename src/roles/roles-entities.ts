import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import {User} from "../users/users-entities";

@Entity("roles")
export class Role {
	static readonly NameMin = 3;
	static readonly NameMax = 30;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: Role.NameMax, unique: true})
	name: string;

	@ManyToMany(() => User, user => user.roles)
	users: User[];
}
