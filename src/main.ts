require('dotenv').config();
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {validationPipeOptions} from './app.config';
import {useContainer} from 'class-validator';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
	useContainer(app.select(AppModule), {fallbackOnErrors: true});
	await app.listen(Number(process.env.appPort));
}
bootstrap();
