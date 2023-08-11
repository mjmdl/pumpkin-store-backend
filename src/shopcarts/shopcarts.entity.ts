import {Payment} from 'src/payments/payments.entity';
import {Skin} from 'src/skins/skins.entity';
import {User} from 'src/users/users.entity';
import {Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity('shopcarts')
export class Shopcart {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(type => User, user => user.shopcarts)
	@JoinColumn({name: 'buyer_id'})
	buyer: User;

	@ManyToMany(type => Skin, skin => skin.shopcarts)
	@JoinTable({
		name: 'shopcarts_have_skins',
		joinColumn: {name: 'shopcart_id'},
		inverseJoinColumn: {name: 'skin_id'}
	})
	skins: Skin[];

	@OneToOne(type => Payment, payment => payment.shopcart, {nullable: true})
	payment: Payment;
}