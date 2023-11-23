import {Request, Response, Router} from "express";
import {dispatchRouteError} from "../utils/routing";
import {HttpStatus} from "../utils/http-status";
import {CreatePurchaseDto} from "./purchases-dtos";
import {extractUserPayload} from "../users/users-services";
import {validateDto} from "../utils/validate-dto";
import {createPurchase, findUserPurchases} from "./purchases-services";
import {requireUserRole} from "../roles/roles-services";

export const purchasesRouter = Router();

purchasesRouter.post(
	"/purchase/create",
	async (req: Request, res: Response) => {
		try {
			const userPayload = await extractUserPayload(
				req.headers.authorization
			);
			const createPurchaseDto = new CreatePurchaseDto(
				userPayload.email,
				req.body.productNames
			);
			await validateDto(createPurchaseDto);

			const result = await createPurchase(createPurchaseDto);
			return res.status(HttpStatus.Created).json(result);
		} catch (error) {
			return dispatchRouteError(res, error);
		}
		return res.sendStatus(HttpStatus.NotImplemented);
	}
);

purchasesRouter.post("/purchases", async (req: Request, res: Response) => {
	try {
		const userPayload = await extractUserPayload(req.headers.authorization);
		await requireUserRole(userPayload.email, "customer");

		const pageSize = Number(req.query["page-size"] ?? 20);
		const pageNumber = Number(req.query["page-number"] ?? 0);

		const result = await findUserPurchases(
			userPayload.email,
			pageSize,
			pageNumber
		);
		return res.status(HttpStatus.Ok).json(result);
	} catch (error) {
		return dispatchRouteError(res, error);
	}
	return res.sendStatus(HttpStatus.NotImplemented);
});
