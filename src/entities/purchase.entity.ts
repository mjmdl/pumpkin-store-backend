import {Entity, PrimaryGeneratedColumn, OneToOne} from "typeorm";
import User from "./user-entity";
import Shopcart from "./shopcart-entity";

@Entity({name: "purchases"})
export default class Purchase {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => Shopcart, shopcart => shopcart.purchase)
	shopcart: Shopcart;
}
