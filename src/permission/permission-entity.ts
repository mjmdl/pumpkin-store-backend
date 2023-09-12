import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import User from "../user/user-entity";

export enum PermissionNames {
	// NOTE: Manually insert the following permissions for the
	// proper working of the API.

	givePermission = 'GIVE_PERMISSION',
	denyPermission = 'DENY_PERMISSION',
	seeUserPermissions = 'SEE_USER_PERMISSIONS',
}

@Entity('permissions')
export class Permission {
	static readonly nameMax = 30;
	static readonly nameMin = 3;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: Permission.nameMax, unique: true})
	name: string;

	@ManyToMany(type => User, user => user.permissions)
	@JoinTable({
		name: 'users_have_permissions',
		joinColumn: {name: 'permission_id'},
		inverseJoinColumn: {name: 'user_id'},
	})
	users: User[];
}
