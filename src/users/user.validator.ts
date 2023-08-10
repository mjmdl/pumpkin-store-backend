import {Injectable} from '@nestjs/common';
import {ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator} from 'class-validator';
import {UsersService} from './users.service';

const isEmailNotUsed = 'IsEmailNotUsed';

@ValidatorConstraint({name: isEmailNotUsed, async: true})
@Injectable()
export class IsEmailNotUsedValidator implements ValidatorConstraintInterface {
	constructor(
		private readonly usersService: UsersService,
	) {}

	async validate(email: string, args?: ValidationArguments): Promise<boolean> {
		return !await this.usersService.findOne({email});
	}

	defaultMessage?(args?: ValidationArguments): string {
		return `Já existe um usuário com o e-mail ${args?.value}`;
	}
}

export function IsEmailNotUsed(options?: ValidationOptions) {
	return (object: Object, propertyName: string): void => {
		registerDecorator({
			name: isEmailNotUsed,
			target: object.constructor,
			propertyName,
			options,
			validator: IsEmailNotUsedValidator,
		});
	};
}
