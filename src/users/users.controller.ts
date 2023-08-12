import {Controller, Get} from '@nestjs/common';
import {UsersService} from './users.service';
import {UserProfile} from './users.dto';
import {Auth, AuthUser} from 'src/auth/auth.guard';
import {UserPayload} from 'src/auth/auth.dto';

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService
	) {}

	@Get('profile')
	@Auth()
	async profile(@AuthUser() payload: UserPayload): Promise<UserProfile> {
		return await this.usersService.profile({email: payload.email});
	}

	@Get('everyones-profile')
	@Auth()
	async everyonesProfile(@AuthUser() payload: UserPayload): Promise<UserProfile[]> {
		return await this.usersService.everyonesProfile();
	}
}