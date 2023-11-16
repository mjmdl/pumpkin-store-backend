import {Request, Response, Router} from "express";
import {dispatchRouteError} from "../utils/routing";
import {HttpStatus} from "../utils/http-status";
import {CreatePurchaseDto} from "./purchases-dtos";
import {extractUserPayload} from "../users/users-services";
import {validateDto} from "../utils/validate-dto";
import {createPurchase} from "./purchases-services";

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
	} catch (error) {
		return dispatchRouteError(res, error);
	}
	return res.sendStatus(HttpStatus.NotImplemented);
});
