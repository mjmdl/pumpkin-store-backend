import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './users.entity';
import {FindOptionsWhere, Repository} from 'typeorm';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>
	) {}

	async create(user: User): Promise<boolean> {
		try {
			return !!await this.usersRepository.insert(user);
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
}