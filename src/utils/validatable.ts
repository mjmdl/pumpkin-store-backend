import {ValidationError, ValidatorOptions, validate} from 'class-validator';

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