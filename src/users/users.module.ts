import {Module, forwardRef} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './users.entity';
import {IsEmailNotUsedValidator} from './user.validator';
import {AuthModule} from 'src/auth/auth.module';

@Module({
	imports: [TypeOrmModule.forFeature([User]), AuthModule],
	controllers: [UsersController],
	providers: [UsersService, IsEmailNotUsedValidator],
	exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}