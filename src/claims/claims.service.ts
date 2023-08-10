import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Claim} from './claims.entity';
import {Repository} from 'typeorm';

@Injectable()
export class ClaimsService {
	constructor(
		@InjectRepository(Claim)
		private readonly claimsRepository: Repository<Claim>,
	) {}
}