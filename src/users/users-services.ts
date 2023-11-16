import {ILike} from "typeorm";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import {dataSource} from "../database";
import {Role} from "../roles/roles-entities";
import {getEnv} from "../utils/env";
import {HttpStatus} from "../utils/http-status";
import {RouteError} from "../utils/routing";
import {validateDto} from "../utils/validate-dto";
import {UserLoginDto, UserPayloadDto, UserSignupDto} from "./users-dtos";
import {User, UserProfile} from "./users-entities";

const userRepo = dataSource.getRepository(User);
const roleRepo = dataSource.getRepository(Role);
const userProfileRepo = dataSource.getRepository(UserProfile);

const BcryptRounds = Number(getEnv("BCRYPT_ROUNDS"));
const JwtSecret = getEnv("JWT_SECRET");
const JwtExpiresIn = getEnv("JWT_EXPIRES_IN");

export async function createUser({name, email, password}: UserSignupDto) {
	if (await userRepo.exist({where: {email}})) {
		throw new RouteError(
			{error: "E-mail is already in use."},
			HttpStatus.Conflict
		);
	}
	password = bcrypt.hashSync(password, bcrypt.genSaltSync(BcryptRounds));
	try {
		const userRole = await roleRepo.findOne({
			where: {name: ILike("customer")},
		});
		if (!userRole) {
			throw new RouteError(
				{error: "Default role not found."},
				HttpStatus.NotFound
			);
		}
		const newUser = userRepo.create({
			name,
			email,
			password,
			roles: new Array(userRole),
		});
		const createdUser = await userRepo.save(newUser);
		return {id: createdUser.id};
	} catch (error) {
		if (error instanceof RouteError) {
			throw error;
		} else {
			throw new RouteError(
				{error: "Could not register user in the database."},
				HttpStatus.UnprocessableContent
			);
		}
	}
}

export async function validateUser({email, password}: UserLoginDto) {
	const userFound = await userRepo.findOne({
		select: {id: true, email: true, password: true},
		where: {email},
	});
	if (!userFound) {
		throw new RouteError(
			{error: "Could not find user."},
			HttpStatus.NotFound
		);
	}

	if (!bcrypt.compareSync(password, userFound.password)) {
		throw new RouteError(
			{error: "Wrong password."},
			HttpStatus.Unauthorized
		);
	}

	const payload = new UserPayloadDto(userFound.id, userFound.email);
	try {
		await validateDto(payload);
	} catch (error) {
		throw new RouteError(
			{error: "Failed to process the token payload"},
			HttpStatus.UnprocessableContent
		);
	}

	const accessToken = jwt.sign({...payload}, JwtSecret, {
		expiresIn: JwtExpiresIn,
	});

	return {accessToken};
}

export async function extractUserPayload(
	authorization: string
): Promise<UserPayloadDto> {
	const [tokenType, token] = authorization?.split(" ") ?? [];
	if (!token || tokenType.toLowerCase() !== "bearer") {
		throw new RouteError(
			{error: "Access token not found."},
			HttpStatus.Unauthorized
		);
	}

	try {
		const payload = <any>jwt.verify(token, JwtSecret);
		const userPayload = new UserPayloadDto(payload.id, payload.email);
		await validateDto(userPayload);
		return userPayload;
	} catch (error) {
		throw new RouteError(
			{error: "Invalid access token."},
			HttpStatus.Unauthorized
		);
	}
}

export async function findUserProfile(email: string): Promise<Object> {
	const userFound = await userProfileRepo.findOne({
		where: {email},
		select: {id: true, name: true, email: true, role: true},
	});
	if (!userFound) {
		throw new RouteError({error: "User not found."}, HttpStatus.NotFound);
	}
	return {...userFound};
}
