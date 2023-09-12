import {Request, Response, Router} from "express";
import {extractUserPayload, findUserBy} from "../user/user-logic";
import {StatusCodes} from "http-status-codes";
import User from '../user/user';
import {findUserPermissions, userHasPermissions} from './permissions-logic';
import {PermissionExpose} from './permission-dto';

const permissionRouter = Router();
export default permissionRouter;

permissionRouter.get('/permissoes/usuario/email=:email', getUserPermissions);
permissionRouter.get('/permissoes/usuario', getUserPermissions);
async function getUserPermissions(request: Request, response: Response) {
	const userPayload = extractUserPayload(request.headers.authorization ?? '');
	if (!userPayload) {
		return response
			.status(StatusCodes.UNAUTHORIZED)
			.send({
				message: 'É necessário estar logado para ver as permissões.'
			});
	}

	const requestUser = await findUserBy({id: userPayload.id});
	if (!requestUser) {
		return response
			.status(StatusCodes.NOT_FOUND)
			.send({
				message: 'O usuário logado não foi encontrado.'
			});
	}

	let targetUser: User;
	const emailParam = request.params.email;
	if (emailParam && emailParam !== requestUser.email) {
		targetUser = await findUserBy({email: emailParam});
		if (!targetUser) {
			return response
				.status(StatusCodes.NOT_FOUND)
				.send({
					message: 'O usuário alvo não foi encontrado.'
				});
		}

		if (!await userHasPermissions(requestUser, 'SEE_USER_PERMISSIONS')) {
			return response
				.status(StatusCodes.UNAUTHORIZED)
				.send({
					message: 'Não é autorizado para ver as permissões de outros usuários.'
				});
		}
	} else {
		targetUser = requestUser;
	}

	const userPermissions = await findUserPermissions(targetUser);

	return response
		.status(StatusCodes.OK)
		.send({
			userPermissions: userPermissions.map(
				permission => new PermissionExpose(permission.id, permission.name)
			)
		});
}

permissionRouter.patch('/permissioes/usuario=:email', patchUserPermissions);
async function patchUserPermissions(request: Request, response: Response) {

}
