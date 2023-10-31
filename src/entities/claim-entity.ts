import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import Role from "./role-entity";

@Entity({name: "user_claims"})
export default class Claim {
	static readonly NAME_MIN = 3;
	static readonly NAME_MAX = 30;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: Claim.NAME_MAX})
	name: string;

	@ManyToMany(() => Role, role => role.claims)
	roles: Role[];
}
