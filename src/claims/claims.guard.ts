import {CanActivate, ExecutionContext, Injectable, UseGuards, mixin} from '@nestjs/common';
import {Claim} from './claims.entity';
import {ClaimsService} from './claims.service';
import {authUserKey} from 'src/auth/auth.guard';
import {UsersService} from 'src/users/users.service';

export function Claims(...requiredClaims: Claim[]) {
	@Injectable()
	class ClaimsGuardMixin implements CanActivate {
		constructor(
			private readonly claimsService: ClaimsService,
			private readonly usersService: UsersService,
		) {}

		async canActivate(context: ExecutionContext): Promise<boolean> {
			const request = context.switchToHttp().getRequest();
			const authUser = request[authUserKey];
			if (!authUser) {
				return false;
			}
			const user = await this.usersService.findOne({email: authUser.email});
			if (!user) {
				return false;
			}
			const userClaims = user.claims.map(claim => claim.name);
			return requiredClaims.some(claim => userClaims.includes(claim.name));
		}
	};
	return UseGuards(mixin(ClaimsGuardMixin));
}