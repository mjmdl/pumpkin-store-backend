import {dataSource} from "../database";
import {HttpStatus} from "../utils/http-status";
import {RouteError} from "../utils/routing";
import {CreateCategoryDto} from "./categories-dtos";
import {Category} from "./categories-entities";

const categoryRepo = dataSource.getRepository(Category);

export async function createCategory({name}: CreateCategoryDto) {
	if (await categoryRepo.exist({where: {name}})) {
		throw new RouteError(
			{error: "Category already exist."},
			HttpStatus.Conflict
		);
	}
	try {
		const newCategory = categoryRepo.create({name});
		const result = await categoryRepo.insert(newCategory);
		return {id: result.identifiers[0].id};
	} catch (error) {
		throw new RouteError(
			{error: "Failed to register category into the database."},
			HttpStatus.UnprocessableContent
		);
	}
}

export async function findAllCategories(
	pageNumber: number,
	pageSize: number
): Promise<Category[]> {
	const MaxPageSize = 20;
	if (pageSize > MaxPageSize) pageSize = MaxPageSize;

	return await categoryRepo.find({
		skip: pageSize * pageNumber,
		take: pageSize,
		select: {name: true},
	});
}
