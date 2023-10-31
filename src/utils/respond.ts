import {Response} from "express";
import HttpStatus from "./http-status";

export function respond(res: Response, status = HttpStatus.OK) {
	res.status(status).send();
}

export function respondJson(
	res: Response,
	json: Object,
	status = HttpStatus.OK
) {
	res.status(status).json(json);
}
