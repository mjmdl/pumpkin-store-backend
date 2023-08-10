import {CanActivate, ExecutionContext, Injectable, UseGuards, createParamDecorator, mixin} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserPayload} from './auth.dto';

export const authUserKey = 'authUser';

export function Auth(): MethodDecorator & ClassDecorator {
	@Injectable()
	class AuthGuardMixin implements CanActivate {
		constructor(
			private readonly authService: AuthService,
		) {}

		async canActivate(context: ExecutionContext): Promise<boolean> {
			const request = context.switchToHttp().getRequest();
			const token = request.headers.authorization;
			const user = await this.authService.extractUserFromToken(token);
			if (!user) {
				return false;
			}
			request[authUserKey] = user;
			return true;
		}
	}
	return UseGuards(mixin(AuthGuardMixin));
}

export const AuthUser = createParamDecorator(
	(data: any, context: ExecutionContext): UserPayload => {
		const request = context.switchToHttp().getRequest();
		return request[authUserKey] ?? null;
	}
);