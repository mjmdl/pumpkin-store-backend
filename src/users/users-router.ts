import {Request, Response, Router} from "express";
import {HttpStatus} from "../utils/http-status";
import {dispatchRouteError} from "../utils/routing";
import {validateDto} from "../utils/validate-dto";
import {UserLoginDto, UserSignupDto} from "./users-dtos";
import {createUser, validateUser, extractUserPayload, findUserProfile} from "./users-services";

export const usersRouter = Router();

usersRouter.post("/user/signup", async (req: Request, res: Response) => {
	try {
		const userSignup = new UserSignupDto(
			req.body.name,
			req.body.email,
			req.body.password
		);
		await validateDto(userSignup);
		const result = await createUser(userSignup);
		return res.status(HttpStatus.Created).json(result);
	} catch (error) {
		return dispatchRouteError(res, error);
	}
	return res.sendStatus(HttpStatus.NotImplemented);
});

usersRouter.post("/user/login", async (req: Request, res: Response) => {
	try {
		const userLogin = new UserLoginDto(req.body.email, req.body.password);
		await validateDto(userLogin);
		const result = await validateUser(userLogin);
		return res.status(HttpStatus.Ok).json(result);
	} catch (error) {
		return dispatchRouteError(res, error);
	}
	return res.sendStatus(HttpStatus.NotImplemented);
});

usersRouter.post("/user/my-profile", async (req: Request, res: Response) => {
	try {
		const userPayload = await extractUserPayload(req.headers.authorization);
		const profile = await findUserProfile(userPayload.email);
		return res.status(HttpStatus.Ok).json(profile);
	} catch (error) {
		return dispatchRouteError(res, error);
	}
	return res.sendStatus(HttpStatus.NotImplemented);
});
