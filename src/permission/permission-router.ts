import {Request, Response, Router} from "express";
import {StatusCodes} from "http-status-codes";

export async function getPermissionByName(request: Request, respose: Response) {
	respose.status(StatusCodes.NOT_IMPLEMENTED).send();
}

export async function getAllPermissions(request: Request, respose: Response) {
	respose.status(StatusCodes.NOT_IMPLEMENTED).send();
}

export async function getUsersByPermission(request: Request, respose: Response) {
	respose.status(StatusCodes.NOT_IMPLEMENTED).send();
}

export async function updateUserPermissions(request: Request, respose: Response) {
	respose.status(StatusCodes.NOT_IMPLEMENTED).send();
}

const permissionRouter = Router();
permissionRouter
	.get('/permissao/:permName', getPermissionByName)
	.get('/permissoes', getAllPermissions)
	.get('/permissao/:permName/usuarios', getUsersByPermission)
	.patch('/permissoes/usuario', updateUserPermissions);
export default permissionRouter;