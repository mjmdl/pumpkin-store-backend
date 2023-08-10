import {ValidationPipeOptions} from '@nestjs/common';
import {JwtModuleOptions} from '@nestjs/jwt';
import {TypeOrmModuleOptions} from '@nestjs/typeorm';

const env = process.env;
export const typeormOptions: TypeOrmModuleOptions = {
	type: 'postgres',
	host: env.dbHost,
	port: Number(env.dbPort),
	username: env.dbUser,
	password: env.dbPassword,
	database: env.dbDatabase,
	synchronize: env.dbOrmSync == 'true',
	autoLoadEntities: true,
};

export const validationPipeOptions: ValidationPipeOptions = {
	whitelist: true,
	forbidNonWhitelisted: true,
	forbidUnknownValues: true,
	transform: true,
};

export const jwtOptions: JwtModuleOptions = {
	global: true,
	secret: env.jwtSecret,
	signOptions: {expiresIn: env.jwtExpiresIn}
};
