import {Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import Shopcart from "./shopcart-entity";

@Entity({name: "bundles"})
export default class Bundle {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToMany(() => Shopcart, shopcart => shopcart.bundles)
	shopcarts: Shopcart[];
}
