import {IsEmail, IsNotEmpty, IsString, Length, ValidationError, ValidatorOptions, validate} from "class-validator";
import User from "./user";

export class Validatable {
	async validate(): Promise<null | ValidationError[]> {
		const options: ValidatorOptions = {
			forbidNonWhitelisted: true,
			whitelist: true,
		};

		try {
			const errors = await validate(this, options);
			if (errors.length > 0) {
				return errors;
			}
		} catch (error) {
			return error;
		}

		return null;
	}
}

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

	constructor (name: string, email: string, password: string) {
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

	constructor (email: string, password: string) {
		super();
		this.email = email;
		this.password = password;
	}
}

export class UserPayload {
	constructor (
		public id: number,
		public email: string,
	) {}
}

export class UserProfile {
	constructor (
		public name: string,
		public email: string,
	) {}
}