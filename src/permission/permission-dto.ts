import {ViewColumn, ViewEntity} from "typeorm";
import {Permission} from "./permission-entity";
import User from "../user/user-entity";
import {IsArray, IsOptional, IsString} from "class-validator";
import {Validatable} from '../utils/validatable';

@ViewEntity({
	expression: dataSource => dataSource.createQueryBuilder()
		.addSelect('permission.id', 'id')
		.addSelect('permission.name', 'name')
		.addSelect('COUNT(user.id)', 'userCount')
		.from(Permission, 'permission')
		.leftJoin(User, 'user')
})
export class PermissionExpose {
	@ViewColumn()
	id: number;

	@ViewColumn()
	name: string;

	@ViewColumn()
	userCount?: number;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}
}

export class UserPermissionsUpdate extends Validatable {
	@IsArray()
	@IsString({each: true})
	@IsOptional()
	give?: string[];

	@IsArray()
	@IsString({each: true})
	@IsOptional()
	deny?: string[];

	constructor(give: string[], deny: string[]) {
		super();
		this.give = give;
		this.deny = deny;
	}
}
