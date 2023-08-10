import {User} from 'src/users/users.entity';
import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity('shopcarts')
export class Shopcart {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(type => User, user => user.shopcarts)
	@JoinColumn({name: 'buyer_id'})
	buyer: User;
}