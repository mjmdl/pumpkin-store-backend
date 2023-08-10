import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator';
import {IsEmailNotUsed} from 'src/users/user.validator';
import {User} from 'src/users/users.entity';

export class UserRegistration {
	@MaxLength(User.nameMax)
	@MinLength(User.nameMin)
	@IsString()
	@IsNotEmpty()
	name: string;

	@MaxLength(User.emailMax)
	@IsEmailNotUsed()
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@MaxLength(User.passwordMax)
	@MinLength(User.passwordMin)
	@IsString()
	@IsNotEmpty()
	password: string;
}

export class UserValidation {
	@MaxLength(User.emailMax)
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@MaxLength(User.passwordMax)
	@MinLength(User.passwordMin)
	@IsString()
	@IsNotEmpty()
	password: string;
}

export class UserPayload {
	id: number;
	email: string;
}