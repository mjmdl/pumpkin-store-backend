import HttpStatus from "utils/http-status";
import {respondJson} from "utils/respond";
import {CreateUserDto, AuthUserDto} from "dtos/user-dtos";
import {Request, Response, Router} from "express";
import {
	doesUserEmailExist,
	createUser,
	findUserByEmail,
	verifyPassword,
	createUserToken,
	extractUserToken,
	findUserProfileByEmail,
} from "services/user-services";

const userRouter = Router();
export default userRouter;

userRouter.post("/usuario/cadastrar", async (req: Request, res: Response) => {
	const createUserDto: CreateUserDto = Object.assign(
		new CreateUserDto(),
		req.body
	);
	const validationResults = await createUserDto.validate();
	if (validationResults) {
		return respondJson(
			res,
			{
				message: "Falha ao validar dados.",
				errors: validationResults.flatMap(result =>
					Object.values(result.constraints)
				),
			},
			HttpStatus.BAD_REQUEST
		);
	}

	const userFound = await doesUserEmailExist(createUserDto.email);
	if (userFound) {
		return respondJson(
			res,
			{
				message: "O e-mail já está em uso.",
				user: {email: createUserDto.email},
			},
			HttpStatus.CONFLICT
		);
	}

	const newUser = createUserDto.createUserEntity();
	const userId = await createUser(newUser);
	if (!userId) {
		return respondJson(
			res,
			{message: "Falha ao criar usuário."},
			HttpStatus.UNPROCESSABLE_CONTENT
		);
	}

	return respondJson(
		res,
		{
			message: "Usuário criado.",
			user: {id: userId},
		},
		HttpStatus.CREATED
	);
});

userRouter.post("/usuario/entrar", async (req: Request, res: Response) => {
	const authUserDto: AuthUserDto = Object.assign(new AuthUserDto(), req.body);
	const validationResults = await authUserDto.validate();
	if (validationResults) {
		return respondJson(
			res,
			{
				message: "Falha ao validar dados.",
				errors: validationResults.map(error => error.constraints),
			},
			HttpStatus.BAD_REQUEST
		);
	}

	const userFound = await findUserByEmail(authUserDto.email);
	if (!userFound) {
		return respondJson(
			res,
			{
				message: "Falha ao buscar usuário por e-mail.",
				user: {email: authUserDto.email},
			},
			HttpStatus.NOT_FOUND
		);
	}

	if (!verifyPassword(authUserDto.password, userFound.password)) {
		return respondJson(
			res,
			{
				message: "Senha de usuário incorreta.",
				user: {email: authUserDto.email},
			},
			HttpStatus.UNAUTHORIZED
		);
	}

	const userToken = createUserToken({
		id: userFound.id,
		email: userFound.email,
	});
	return respondJson(res, {message: "Logado.", token: userToken});
});

userRouter.post("/usuario/perfil", async (req: Request, res: Response) => {
	const authorization = req.headers.authorization;
	if (!authorization) {
		return respondJson(
			res,
			{message: "Token de acesso não encontrado."},
			HttpStatus.UNAUTHORIZED
		);
	}

	const userTokenDto = extractUserToken(req.headers.authorization);
	if (!userTokenDto) {
		return respondJson(
			res,
			{message: "Token de acesso inválido."},
			HttpStatus.UNAUTHORIZED
		);
	}

	const userProfile = await findUserProfileByEmail(userTokenDto.email);
	if (!userProfile) {
		return respondJson(
			res,
			{
				message: "Usuário não encontrado.",
				user: {email: userTokenDto.email},
			},
			HttpStatus.NOT_FOUND
		);
	}

	return respondJson(res, userProfile);
});
