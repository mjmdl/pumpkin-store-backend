import {Request, Response, Router} from "express";
import {UserCreate, UserProfile, UserValidate} from "./user-dto";
import {StatusCodes} from "http-status-codes";
import {extractUserPayload, findUserBy, generateUserToken, insertUser, validateUser} from "./user-logic";
import User from "./user";

const userRouter = Router();
userRouter
	.post('/usuario', createUser)
	.get('/usuario', getUserToken)
	.get('/usuario/perfil', getUserProfile);
export default userRouter;

async function createUser(request: Request, response: Response) {
	const {body} = request;
	const userCreate = new UserCreate(body.name, body.email, body.password);
	const userCreateErrors = await userCreate.validate();
	if (userCreateErrors?.length > 0) {
		return response
			.status(StatusCodes.BAD_REQUEST)
			.send({
				message: 'Não foi possível criar o usuário.',
				errors: userCreateErrors.map(error => error.constraints),
			});
	}

	if (await findUserBy({email: userCreate.email})) {
		return response
			.status(StatusCodes.CONFLICT)
			.send({
				message: `O e-mail ${userCreate.email} já está em uso.`
			});
	}

	const newUser = new User(userCreate.name, userCreate.email, userCreate.password);
	if (!await insertUser(newUser)) {
		return response
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send({
				message: `Falha ao criar o usuário ${userCreate.email}.`
			});
	}

	return response
		.status(StatusCodes.CREATED)
		.send();
}

async function getUserToken(request: Request, response: Response) {
	const {body} = request;
	const userValidate = new UserValidate(body.email, body.password);
	const userValidateErrors = await userValidate.validate();
	if (userValidateErrors?.length > 0) {
		return response
			.status(StatusCodes.BAD_REQUEST)
			.send({
				message: 'Não foi possível validar o usuário.',
				errors: userValidateErrors.map(error => error.constraints),
			});
	}

	const user = await findUserBy({email: userValidate.email});
	if (!user) {
		return response
			.status(StatusCodes.NOT_FOUND)
			.send({
				message: `Não foi possível encontrar o usuário ${userValidate.email}.`
			});
	}

	if (!validateUser(userValidate, user)) {
		return response
			.status(StatusCodes.UNAUTHORIZED)
			.send({
				message: `A senha não corresponde para o usuário ${userValidate.email}.`
			});
	}

	return response
		.status(StatusCodes.OK)
		.send({
			userToken: generateUserToken(user)
		});
}

async function getUserProfile(request: Request, response: Response) {
	const userPayload = extractUserPayload(request.headers.authorization);
	if (!userPayload) {
		return response
			.status(StatusCodes.UNAUTHORIZED)
			.send({
				message: `É necessário estar autenticado para ver seu perfil.`
			});
	}

	const user = await findUserBy({id: userPayload.id});
	if (!user) {
		return response
			.status(StatusCodes.NOT_FOUND)
			.send();
	}

	response
		.status(StatusCodes.OK)
		.send({
			userProfile: new UserProfile(user.name, user.email)
		});
}
