import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";
import User from "./user-entity";
import {Validatable} from '../utils/validatable';

export class UserCreate extends Validatable {
	@Length(User.nameMin, User.nameMax)
	@IsString()
	@IsNotEmpty()
	name: string;

	@Length(User.emailMin, User.emailMax)
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Length(User.passwordMin, User.passwordMax)
	@IsString()
	@IsNotEmpty()
	password: string;

	constructor(name: string, email: string, password: string) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
	}
}

export class UserValidate extends Validatable {
	@Length(User.emailMin, User.emailMax)
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Length(User.passwordMin, User.passwordMax)
	@IsString()
	@IsNotEmpty()
	password: string;

	constructor(email: string, password: string) {
		super();
		this.email = email;
		this.password = password;
	}
}

export class UserPayload {
	constructor(
		public id: number,
		public email: string,
	) {}
}

export class UserProfile {
	constructor(
		public name: string,
		public email: string,
	) {}
}