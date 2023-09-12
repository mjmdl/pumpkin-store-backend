import {ViewColumn, ViewEntity} from "typeorm";
import {Permission} from "./permission-entity";
import User from "../user/user";
import {IsOptional, IsString} from "class-validator";

export class UserPermissionsUpdate {
	@IsString({each: true})
	@IsOptional()
	give: string[];

	@IsString({each: true})
	@IsOptional()
	deny: string[];
}

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
	userCount: number;
}
