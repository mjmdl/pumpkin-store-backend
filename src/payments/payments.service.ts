import {Repository} from 'typeorm';
import {Payment} from './payments.entity';
import {InjectRepository} from '@nestjs/typeorm';

export class PaymentsService {
	constructor(
		@InjectRepository(Payment)
		private readonly paymentsRepository: Repository<Payment>
	) {}
}