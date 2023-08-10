import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Shopcart} from './shopcarts.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Shopcart])]
})
export class ShopcartsModule {}