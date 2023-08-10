import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Closet} from './closets.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Closet])],
})
export class ClosetsModule {}