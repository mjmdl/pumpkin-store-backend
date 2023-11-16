import {IsArray, IsEmail, IsNotEmpty, IsString, Length} from "class-validator";
import {User} from "../users/users-entities";
import {Role} from "./roles-entities";

export class SetUserRoleDto {
	@IsNotEmpty()
	@IsEmail()
	@Length(User.EmailMin, User.EmailMax)
	userEmail: string;

	@IsNotEmpty({each: true})
	@IsString({each: true})
	@Length(Role.NameMin, Role.NameMax, {each: true})
	@IsArray()
	roleNames: string[];

	constructor(userEmail?: string, roleNames?: string[]) {
		this.userEmail = userEmail;
		this.roleNames = roleNames;
	}
}
