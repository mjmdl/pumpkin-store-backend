import {ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UsersService} from 'src/users/users.service';
import {UserPayload, UserRegistration, UserValidation} from './auth.dto';
import {User} from 'src/users/users.entity';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';

export type AccessToken = string;

const env = process.env;

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async register(registration: UserRegistration): Promise<void> {
		const newUser = new User;
		newUser.name = registration.name;
		newUser.email = registration.email;
		newUser.password = bcrypt.hashSync(
			registration.password,
			bcrypt.genSaltSync(Number(env.pwSaltRounds))
		);
		if (!await this.usersService.create(newUser)) {
			throw new ConflictException('Failed to create user');
		}
	}

	async validate(validation: UserValidation): Promise<AccessToken> {
		const user = await this.usersService.findOne({email: validation.email});
		if (!user) {
			throw new NotFoundException;
		} else if (!bcrypt.compareSync(validation.password, user.password)) {
			throw new UnauthorizedException;
		} else try {
			const payload: UserPayload = {
				id: user.id,
				email: user.email
			};
			return await this.jwtService.sign(
				Object.assign(new Object, payload),
				{secret: env.jwtSecret}
			);
		} catch (error) {
			throw new InternalServerErrorException;
		}
	}

	async extractUserFromToken(accessToken: AccessToken
	): Promise<UserPayload | null> {
		const [type, token] = accessToken.split(' ') ?? [];
		if (!token && type !== 'Bearer') {
			return null;
		} else try {
			return this.jwtService.verify(
				token, {secret: env.jwtSecret}
			) as UserPayload;
		} catch (error) {
			return null;
		}
	}
}