import {Request, Response, Router} from "express";
import {validateDto} from "../utils/validate-dto";
import {CreateCategoryDto} from "./categories-dtos";
import {HttpStatus} from "../utils/http-status";
import {RouteError, dispatchRouteError} from "../utils/routing";
import {extractUserPayload} from "../users/users-services";
import {requireUserRole} from "../roles/roles-services";
import {createCategory, findAllCategories} from "./categories-services";

export const categoriesRouter = Router();

categoriesRouter.post(
	"/category/create",
	async (req: Request, res: Response) => {
		try {
			const categoryCreateDto = new CreateCategoryDto(req.body.name);
			await validateDto(categoryCreateDto);

			const userPayload = await extractUserPayload(
				req.headers.authorization
			);
			await requireUserRole(userPayload.email, "Vendor");

			const result = await createCategory(categoryCreateDto);
			return res.status(HttpStatus.Ok).json(result);
		} catch (error) {
			return dispatchRouteError(res, error);
		}
		return res.sendStatus(HttpStatus.NotImplemented);
	}
);

categoriesRouter.get("/categories", async (req: Request, res: Response) => {
	try {
		let pageNumber = Number(req.query["page-number"] ?? 20);
		let pageSize = Number(req.query["page-size"] ?? 0);

		const result = await findAllCategories(pageNumber, pageSize);
		return res.status(HttpStatus.Ok).json({categories: result});
	} catch (error) {
		return dispatchRouteError(res, error);
	}
	return res.sendStatus(HttpStatus.NotImplemented);
});
