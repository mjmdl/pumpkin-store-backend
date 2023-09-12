import {Request, Response, Router} from "express";
import {extractUserPayload, findUserBy} from "../user/user-logic";
import {StatusCodes} from "http-status-codes";
import User from '../user/user-entity';
import {findUserPermissions, updateUserPermissions, userHasPermissions} from './permissions-logic';
import {PermissionExpose, UserPermissionsUpdate} from './permission-dto';
import {PermissionNames} from './permission-entity';

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

		if (!await userHasPermissions(requestUser, PermissionNames.seeUserPermissions)) {
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

permissionRouter.patch('/permissoes/usuario/email=:email', patchUserPermissions);
async function patchUserPermissions(request: Request, response: Response) {
	const userPermissionsUpdate = new UserPermissionsUpdate(
		request.body.give ?? new Array<string>,
		request.body.deny ?? new Array<string>
	);
	const validateErrors = await userPermissionsUpdate.validate();
	if (validateErrors) {
		return response
			.status(StatusCodes.BAD_REQUEST)
			.send({
				message: 'Dados de permissões inválidos.',
				errors: validateErrors.map(error => error.constraints)
			});
	}

	if (userPermissionsUpdate.deny?.length === 0 && userPermissionsUpdate.give?.length === 0) {
		return response
			.status(StatusCodes.BAD_REQUEST)
			.send({
				message: 'Dados de permissões inválidos.'
			});
	}

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

	if (
		userPermissionsUpdate.give.length !== 0 &&
		!await userHasPermissions(requestUser, PermissionNames.givePermission, ...userPermissionsUpdate.give)
	) {
		return response
			.status(StatusCodes.UNAUTHORIZED)
			.send({
				message: 'Não tem as permissões necessárias para dar permissões à alguém.'
			});
	}

	if (
		userPermissionsUpdate.deny.length !== 0 &&
		!await userHasPermissions(requestUser, PermissionNames.denyPermission, ...userPermissionsUpdate.deny)
	) {
		return response
			.status(StatusCodes.UNAUTHORIZED)
			.send({
				message: 'Não tem as permissões necessárias para tirar permissões de alguém.'
			});
	}

	const targetUser = await findUserBy({email: request.params.email});
	if (!targetUser) {
		return response
			.status(StatusCodes.NOT_FOUND)
			.send({
				message: 'O usuário alvo não foi encontrado.'
			});
	}

	if (!await updateUserPermissions(targetUser, userPermissionsUpdate)) {
		return response
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send({
				message: 'Falha ao atualizar as permissões do usuário.'
			});
	}

	return response
		.status(StatusCodes.OK)
		.send();
}
