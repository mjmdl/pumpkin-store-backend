import {Request, Response} from "express";
import {HttpStatus} from "./http-status";
import {log} from "./logger";

export class RouteError {
	constructor (
		public output: any,
		public status = HttpStatus.InternalServerError
	) {}
}

export function dispatchRouteError(res: Response, error: any) {
	log.error(error);
	if (error instanceof RouteError) {
		return res.status(error.status).json(error.output);
	} else {
		return res.sendStatus(HttpStatus.InternalServerError);
	}
}

export async function dispatchRoute(req: Request, res: Response, handler: Function) {
	try {
		await handler(req, res);
	} catch (error) {
		dispatchRouteError(res, error);
	}
}
