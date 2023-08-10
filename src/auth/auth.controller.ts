import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserRegistration, UserValidation} from './auth.dto';
import {AccessToken, AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) {}

	@Post('register')
	async register(@Body() registration: UserRegistration
	): Promise<void> {
		await this.authService.register(registration);
	}

	@Get('validate')
	async validate(@Body() validation: UserValidation
	): Promise<{accessToken: AccessToken;}> {
		return {
			accessToken: await this.authService.validate(validation)
		};
	}
}