import {ValidationError, ValidatorOptions, validate} from "class-validator";

export default class Validatable {
	static readonly options: ValidatorOptions = {
		whitelist: true,
		forbidNonWhitelisted: true,
		forbidUnknownValues: true,
	};

	async validate(
		options = Validatable.options
	): Promise<null | ValidationError[]> {
		try {
			const errors = await validate(this, options);
			if (errors.length > 0) {
				return errors;
			}
			return null;
		} catch (error) {
			console.error(error);
			return error;
		}
	}
}
