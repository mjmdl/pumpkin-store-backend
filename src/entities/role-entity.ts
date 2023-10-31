import {
	Column,
	Entity,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import Claim from "./claim-entity";
import User from "./user-entity";

@Entity({name: "user_roles"})
export default class Role {
	static readonly TITLE_MIN = 3;
	static readonly TITLE_MAX = 30;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: Role.TITLE_MAX})
	title: string;

	@ManyToMany(() => Claim, claim => claim.roles)
	claims: Claim[];

	@OneToMany(() => User, user => user.role)
	users: User[];
}
