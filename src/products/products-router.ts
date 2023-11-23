import {Request, Response, Router} from "express";
import {dispatchRouteError} from "../utils/routing";
import {HttpStatus} from "../utils/http-status";
import {requireUserRole} from "../roles/roles-services";
import {extractUserPayload} from "../users/users-services";
import {CreateProductDto} from "./products-dtos";
import {validateDto} from "../utils/validate-dto";
import {createProduct, findAllProducts, findAllProductsByCategory} from "./products-services";

export const productsRouter = Router();

productsRouter.post("/product/create", async (req: Request, res: Response) => {
	try {
		const userPayload = await extractUserPayload(req.headers.authorization);
		await requireUserRole(userPayload.email, "vendor");

		const createProductDto = new CreateProductDto(
			req.body.name,
			req.body.description,
			req.body.price,
			req.body.category
		);
		await validateDto(createProductDto);

		const result = await createProduct(createProductDto);
		return res.status(HttpStatus.Created).json(result);
	} catch (error) {
		return dispatchRouteError(res, error);
	}
	return res.sendStatus(HttpStatus.NotImplemented);
});

productsRouter.get("/products", async (req: Request, res: Response) => {
	try {
		const pageSize = Number(req.query["page-size"] ?? 20);
		const pageNumber = Number(req.query["page-number"] ?? 0);

		const categoryName = req.query["category"];
		if (categoryName) {
			const result = await findAllProductsByCategory(String(categoryName), pageNumber, pageSize);
			return res.status(HttpStatus.Ok).json(result);
		} else {
			const result = await findAllProducts(pageNumber, pageSize);
			return res.status(HttpStatus.Ok).json(result);
		}
	} catch (error) {
		return dispatchRouteError(res, error);
	}
	return res.sendStatus(HttpStatus.NotImplemented);
});
