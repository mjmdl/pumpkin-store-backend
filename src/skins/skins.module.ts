import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Skin} from './skins.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Skin])],
})
export class SkinsModule {}