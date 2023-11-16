import {
	ArrayMinSize,
	IsEmail,
	IsNotEmpty,
	IsString,
	Length,
} from "class-validator";
import {User} from "../users/users-entities";
import {Product} from "../products/products-entities";

export class CreatePurchaseDto {
	@IsNotEmpty()
	@IsEmail()
	@Length(User.EmailMin, User.EmailMax)
	userEmail: string;

	@IsNotEmpty({each: true})
	@IsString({each: true})
	@Length(Product.NameMin, Product.NameMax, {each: true})
	@ArrayMinSize(1)
	productNames: string[];

	constructor(userEmail?: string, productNames?: string[]) {
		this.userEmail = userEmail;
		this.productNames = productNames;
	}
}
