import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './users.entity';
import {FindOptionsWhere, Repository} from 'typeorm';
import {UserProfile} from './users.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>
	) {}

	async create(user: User): Promise<boolean> {
		try {
			return !!await this.usersRepository.insert(user);
			console.log(await this.usersRepository.findOneBy({id: user.id}));
		} catch (error) {
			return false;
		}
	}

	async findOne(by: FindOptionsWhere<User>): Promise<User | null> {
		try {
			return await this.usersRepository.findOneByOrFail(by);
		} catch (error) {
			return null;
		}
	}

	async profile(where: FindOptionsWhere<User>): Promise<UserProfile> {
		let user: User;
		try {
			user = await this.usersRepository.findOneOrFail({
				where, relations: {permissions: true}
			});
		} catch (error) {
			throw new NotFoundException;
		}
		return {
			name: user.name,
			email: user.email,
			permissions: user.permissions.map(permission => permission.name),
		};
	}

	async everyonesProfile(): Promise<UserProfile[]> {
		try {
			const users = await this.usersRepository.find({relations: {permissions: true}});
			return users.map(user => ({
				name: user.name,
				email: user.email,
				permissions: user.permissions.map(permission => permission.name)
			}));
		} catch (error) {
			throw NotFoundException;
		}
	}
}