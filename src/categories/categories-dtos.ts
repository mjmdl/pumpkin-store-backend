import {IsNotEmpty, IsString, Length} from "class-validator";
import {Category} from "./categories-entities";

export class CreateCategoryDto {
	@IsNotEmpty()
	@IsString()
	@Length(Category.NameMin, Category.NameMax)
	name: string;

	constructor(name: string) {
		this.name = name;
	}
}
