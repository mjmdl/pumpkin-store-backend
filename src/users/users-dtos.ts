import {IsNotEmpty, IsEmail, Length, IsString, IsInt} from "class-validator";
import {User} from "./users-entities";

export class UserSignupDto {
	@IsNotEmpty()
	@IsString()
	@Length(User.NameMin, User.NameMax)
	name: string;

	@IsNotEmpty()
	@IsEmail()
	@Length(User.EmailMin, User.EmailMax)
	email: string;

	@IsNotEmpty()
	@IsString()
	@Length(User.PasswordMin, User.PasswordMax)
	password: string;

	constructor(name?: string, email?: string, password?: string) {
		this.name = name;
		this.email = email;
		this.password = password;
	}
}

export class UserLoginDto {
	@IsNotEmpty()
	@IsEmail()
	@Length(User.EmailMin, User.EmailMax)
	email: string;

	@IsNotEmpty()
	@IsString()
	@Length(User.PasswordMin, User.PasswordMax)
	password: string;

	constructor(email?: string, password?: string) {
		this.email = email;
		this.password = password;
	}
}

export class UserPayloadDto {
	@IsNotEmpty()
	@IsInt()
	id: number;

	@IsNotEmpty()
	@IsEmail()
	@Length(User.EmailMin, User.EmailMax)
	email: string;

	constructor(id?: number, email?: string) {
		this.id = id;
		this.email = email;
	}
}
