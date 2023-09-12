import {Request, Response, Router} from "express";
import { findUserBy } from "../user/user-logic";
import { StatusCodes } from "http-status-codes";
import { findUserPermissions } from "./permissions-logic";
import { isEmail } from "class-validator";

const permissionRouter = Router();
permissionRouter
	.get('/permissoes/usuario=:email', getUserPermissions);
export default permissionRouter;

async function getUserPermissions(request: Request, response: Response) {
	const userEmail = request.params.email;
	if (!userEmail || !isEmail(userEmail)) {
		return response
			.status(StatusCodes.BAD_REQUEST)
			.send({
				message: 'O e-mail fornecido é inválido.'
			});
	}
	
	const user = await findUserBy({email: request.params.email});
	if (!user) {
		return response
			.status(StatusCodes.NOT_FOUND)
			.send({
				message: 'Usuário não foi encontrado.'
			});
	}

	const permissions = await findUserPermissions(user);
	if (!permissions) {
		return response
			.status(StatusCodes.NOT_FOUND)
			.send({
				message: 'Nenhuma permissão foi encontrada.'
			});
	}

	return response
		.status(StatusCodes.OK)
		.send({
			userPermissions: permissions
		});
}
