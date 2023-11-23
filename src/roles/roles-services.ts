import {ILike} from "typeorm";
import {dataSource} from "../database";
import {User} from "../users/users-entities";
import {HttpStatus} from "../utils/http-status";
import {RouteError} from "../utils/routing";
import {Role} from "./roles-entities";
import {SetUserRoleDto} from "./roles-dtos";

const userRepo = dataSource.getRepository(User);
const roleRepo = dataSource.getRepository(Role);

export async function requireUserRole(userEmail: string, roleName: string) {
	const requiredRole = await roleRepo.findOne({
		where: {name: ILike(roleName)},
		select: {id: true},
	});
	if (!requiredRole) {
		throw new RouteError(
			{error: "Could not find role."},
			HttpStatus.NotFound
		);
	}

	const user = await userRepo.findOne({
		where: {email: userEmail},
		relations: {roles: true},
		select: {roles: {id: true}},
	});
	if (!user) {
		throw new RouteError(
			{error: "Could not find user."},
			HttpStatus.NotFound
		);
	}

	if (!user.roles || !user.roles.some(role => role.id === requiredRole.id)) {
		throw new RouteError(
			{error: "Permissions missing."},
			HttpStatus.Unauthorized
		);
	}
}

export async function setUserRole(setUserRoleDto: SetUserRoleDto) {
	const targetUser = await userRepo.findOne({
		where: {email: setUserRoleDto.userEmail},
	});
	if (!targetUser) {
		throw new RouteError({error: "User not found."}, HttpStatus.NotFound);
	}

	const newRoles = new Array<Role>();
	for (const roleName of setUserRoleDto.roleNames) {
		const roleFound = await roleRepo.findOne({
			where: {name: ILike(roleName)},
			select: {id: true, name: true},
		});
		if (!roleFound) {
			throw new RouteError(
				{error: `Role ${roleName} is not found`},
				HttpStatus.NotFound
			);
		}
		newRoles.push(roleFound);
	}

	targetUser.roles = newRoles;
	const updatedUser = await userRepo.save(targetUser);
}

export async function findAllRoles() {
	const roles = await roleRepo.find({select: {id: true, name: true}});
	return {roles};
}
