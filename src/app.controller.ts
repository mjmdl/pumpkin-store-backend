import {Controller, Get} from '@nestjs/common';

@Controller('test')
export class AppController {
	@Get()
	test() {
		console.log('Deu');
		return 'Deu';
	}
}

