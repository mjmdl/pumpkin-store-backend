import {ValidatorOptions, validate} from "class-validator";
import {RouteError} from "./routing";

const DefaultValidatorOptions: ValidatorOptions = {
	whitelist: true,
	forbidNonWhitelisted: true,
	forbidUnknownValues: true,
};

export async function validateDto(dto: object, options = DefaultValidatorOptions) {
	const valErrors = await validate(dto, options);
	if (valErrors.length) {
		throw new RouteError({
			errors: valErrors.flatMap(error =>
				Object.values(error.constraints)
			),
		});
	}
}
