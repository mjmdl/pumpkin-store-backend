import {Request, Response, Router} from "express";
import {dispatchRouteError} from "../utils/routing";
import {HttpStatus} from "../utils/http-status";
import {requireUserRole, setUserRole} from "./roles-services";
import {extractUserPayload} from "../users/users-services";
import {SetUserRoleDto} from "./roles-dtos";
import {validateDto} from "../utils/validate-dto";

export const rolesRouter = Router();

rolesRouter.post("/roles", async (req: Request, res: Response) => {
	try {
		const userPayload = await extractUserPayload(req.headers.authorization);
		await requireUserRole(userPayload.email, "Admin");

		const setUserRoleDto = new SetUserRoleDto(
			req.body.userEmail,
			req.body.roleNames
		);
		await validateDto(setUserRoleDto);

		const result = await setUserRole(setUserRoleDto);
		return res.status(HttpStatus.Ok).json(result);
	} catch (error) {
		return dispatchRouteError(res, error);
	}
	return res.sendStatus(HttpStatus.NotImplemented);
});
