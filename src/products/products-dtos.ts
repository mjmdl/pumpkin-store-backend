import {IsNotEmpty, IsNumber, IsPositive, IsString, Length, MaxLength} from "class-validator";
import {Product} from "./products-entities";
import {Category} from "../categories/categories-entities";

export class CreateProductDto {
	@IsNotEmpty()
	@IsString()
	@Length(Product.NameMin, Product.NameMax)
	name: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(Product.DescriptionMax)
	description: string;

	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	price: number;

	@IsNotEmpty()
	@IsString()
	@Length(Category.NameMin, Category.NameMax)
	category: string;

	constructor (
		name?: string,
		description?: string,
		price?: number,
		category?: string
	) {
		this.name = name;
		this.description = description;
		this.price = price;
		this.category = category;
	}
}
