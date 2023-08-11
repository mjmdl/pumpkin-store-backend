import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {jwtOptions, typeormOptions} from './app.config';
import {AuthModule} from './auth/auth.module';
import {JwtModule} from '@nestjs/jwt';
import {ClaimsModule} from './claims/claims.module';
import {ShopcartsModule} from './shopcarts/shopcarts.module';
import {SkinsModule} from './skins/skins.module';
import {CategoriesModule} from './categories/categories.module';
import {AppController} from './app.controller';
import {PaymentsModule} from './payments/payments.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(typeormOptions),
		JwtModule.register(jwtOptions),
		AuthModule,
		CategoriesModule,
		ClaimsModule,
		PaymentsModule,
		ShopcartsModule,
		SkinsModule,
		UsersModule,
	],
	controllers: [AppController],
})
export class AppModule {}
