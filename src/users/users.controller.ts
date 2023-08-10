import {Controller, Get} from '@nestjs/common';
import {UsersService} from './users.service';
import {UserProfile} from './users.dto';
import {Auth, AuthUser} from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService
	) {}

	@Get('profile')
	@Auth()
	async profile(@AuthUser() profile: UserProfile): Promise<UserProfile> {
		return profile;
	}
}