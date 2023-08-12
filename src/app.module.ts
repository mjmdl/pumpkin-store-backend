import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {jwtOptions, typeormOptions} from './app.config';
import {AuthModule} from './auth/auth.module';
import {JwtModule} from '@nestjs/jwt';
import {PermissionsModule} from './permissions/permissions.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(typeormOptions),
		JwtModule.register(jwtOptions),
		AuthModule,
		PermissionsModule,
		UsersModule,
	],
})
export class AppModule {}
