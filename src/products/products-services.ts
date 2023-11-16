import {ILike} from "typeorm";
import {Category} from "../categories/categories-entities";
import {dataSource} from "../database";
import {HttpStatus} from "../utils/http-status";
import {RouteError} from "../utils/routing";
import {CreateProductDto} from "./products-dtos";
import {Product} from "./products-entities";

const categoryRepo = dataSource.getRepository(Category);
const productRepo = dataSource.getRepository(Product);

export async function createProduct(createProductDto: CreateProductDto) {
	if (await productRepo.exist({where: {name: createProductDto.name}})) {
		throw new RouteError(
			{error: "Product with the same name already exist."},
			HttpStatus.Conflict
		);
	}

	const category = await categoryRepo.findOne({
		where: {name: ILike(createProductDto.category)},
		select: {id: true, name: true},
	});
	if (!category) {
		throw new RouteError(
			{error: "Category not found."},
			HttpStatus.NotFound
		);
	}

	const newProduct = productRepo.create({
		...createProductDto,
		category: category,
	});
	const result = await productRepo.save(newProduct);
	return {id: result.id};
}

export async function findAllProducts(
	pageNumber: number,
	pageSize: number
): Promise<Product[]> {
	const products = await productRepo.find({
		skip: pageNumber * pageSize,
		take: pageSize,
		select: {
			id: true,
			name: true,
			price: true,
			description: true,
			category: {name: true},
		},
		relations: {category: true},
	});
	return products;
}
