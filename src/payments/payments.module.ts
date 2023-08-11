import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Payment} from './payments.entity';
import {PaymentsService} from './payments.service';

@Module({
	imports: [TypeOrmModule.forFeature([Payment])],
	providers: [PaymentsService]
})
export class PaymentsModule {}