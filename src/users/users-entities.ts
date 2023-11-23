import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	JoinTable,
	OneToMany,
	ViewColumn,
	ViewEntity,
} from "typeorm";
import {Purchase} from "../purchases/purchases-entities";
import {Role} from "../roles/roles-entities";

@Entity("users")
export class User {
	static readonly NameMin = 3;
	static readonly NameMax = 30;
	static readonly EmailMin = 5;
	static readonly EmailMax = 100;
	static readonly PasswordMin = 8;
	static readonly PasswordMax = 16;
	static readonly PasswordLen = 60;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: User.NameMax})
	name: string;

	@Column({length: User.EmailMax, unique: true})
	email: string;

	@Column({length: User.PasswordLen})
	password: string;

	@ManyToMany(() => Role, role => role.users)
	@JoinTable({
		name: "users_have_roles",
		joinColumn: {name: "user_id"},
		inverseJoinColumn: {name: "role_id"},
	})
	roles: Role[];

	@OneToMany(() => Purchase, purchase => purchase.user)
	purchases: Purchase[];
}

@ViewEntity({
	name: "user_profile_view",
	dependsOn: [User, Role, Purchase],
	expression: `
		SELECT u.id AS id,
			u.name AS name,
			u.email AS email,
			ARRAY_AGG(r.name) AS role_names,
			COUNT(p.id) AS purchases_count
		FROM users AS u
		LEFT JOIN users_have_roles AS ur ON ur.user_id = u.id
		LEFT JOIN roles AS r ON ur.role_id = r.id
		LEFT JOIN purchases AS p ON p.user_id = u.id
		GROUP BY u.id, u.name, u.email
	`,
})
export class UserProfile {
	@ViewColumn()
	id: number;

	@ViewColumn()
	name: string;

	@ViewColumn()
	email: string;

	@ViewColumn({name: "role_names"})
	role: string[];

	@ViewColumn({name: "purchases_count"})
	purchases: number;
}
