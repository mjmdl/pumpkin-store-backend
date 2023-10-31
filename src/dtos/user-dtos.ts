import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";
import Validatable from "utils/validatable";
import User from "entities/user-entity";

export class CreateUserDto extends Validatable {
	@IsNotEmpty()
	@IsString()
	@Length(User.NAME_MIN, User.NAME_MAX)
	name: string;

	@IsNotEmpty()
	@IsEmail()
	@Length(User.EMAIL_MIN, User.EMAIL_MAX)
	email: string;

	@IsNotEmpty()
	@IsString()
	@Length(User.PASSWORD_MIN, User.PASSWORD_MAX)
	password: string;

	createUserEntity(): User {
		const newUser = new User();
		newUser.name = this.name;
		newUser.email = this.email;
		newUser.password = this.password;
		return newUser;
	}
}

export class AuthUserDto extends Validatable {
	@IsNotEmpty()
	@IsEmail()
	@Length(User.EMAIL_MIN, User.EMAIL_MAX)
	email: string;

	@IsNotEmpty()
	@IsString()
	@Length(User.PASSWORD_MIN, User.PASSWORD_MAX)
	password: string;
}

export class UserTokenDto {
	id: number;
	email: string;
}
