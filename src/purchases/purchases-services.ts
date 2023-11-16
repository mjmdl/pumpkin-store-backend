import {dataSource} from "../database";
import {Product} from "../products/products-entities";
import {User} from "../users/users-entities";
import {HttpStatus} from "../utils/http-status";
import {RouteError} from "../utils/routing";
import {CreatePurchaseDto} from "./purchases-dtos";
import {Purchase} from "./purchases-entities";

const userRepo = dataSource.getRepository(User);
const productsRepo = dataSource.getRepository(Product);
const purchasesRepo = dataSource.getRepository(Purchase);

export async function createPurchase({
	userEmail,
	productNames,
}: CreatePurchaseDto) {
	const customerUser = await userRepo.findOne({where: {email: userEmail}});
	if (!customerUser) {
		throw new RouteError(
			{error: "User is not found."},
			HttpStatus.NotFound
		);
	}

	const products = new Array<Product>();
	for (const productName of productNames) {
		const product = await productsRepo.findOne({
			where: {name: productName},
			select: {id: true, price: true},
		});
		if (!product) {
			throw new RouteError(
				{error: `Product ${productName} is not found.`},
				HttpStatus.NotFound
			);
		}
		products.push(product);
	}

	const newPurchase = purchasesRepo.create({
		id: undefined,
		user: customerUser,
		products,
	});
	const result = await purchasesRepo.save(newPurchase);
	return {id: result.id};
}
