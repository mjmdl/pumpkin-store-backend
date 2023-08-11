import {Shopcart} from 'src/shopcarts/shopcarts.entity';
import {Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';

export enum PaymentForm {
	cash = 'Dinheiro',
	pix = 'PIX',
	bill = 'Boleto',
	card = 'Cartão',
};

@Entity('payments')
export class Payment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({name: 'total_price'})
	totalPrice: number;

	@Column({enum: PaymentForm})
	form: PaymentForm;

	@OneToOne(type => Shopcart, shopcart => shopcart.payment)
	@JoinColumn({name: 'shopcart_id'})
	shopcart: Shopcart;
}