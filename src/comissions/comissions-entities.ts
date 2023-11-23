import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("comissions")
export class Comission {
	@PrimaryGeneratedColumn()
	id: number;
}
