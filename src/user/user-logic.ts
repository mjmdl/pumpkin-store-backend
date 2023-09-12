import {FindOptionsWhere} from "typeorm";
import User from "./user";
import database from "../database";
import * as bcrypt from 'bcrypt';
import {UserPayload, UserValidate} from "./user-dto";
import jwt from 'jsonwebtoken';

const env = process.env;
const jwtSecret = env.jwtSecret;
const jwtOptions: jwt.SignOptions = {
	expiresIn: env.jwtExpiresIn
};

function hashPassword(password: string): string {
	const saltRounds = 10;
	return bcrypt.hashSync(
		password,
		bcrypt.genSaltSync(saltRounds)
	);
}

export async function findUserBy(where: FindOptionsWhere<User>): Promise<User | null> {
	try {
		const user = await database.manager.findOneByOrFail(User, where);
		return user ?? null;
	} catch (error) {
		return null;
	}
}

export async function insertUser(user: User): Promise<boolean> {
	user.password = hashPassword(user.password);

	try {
		await database.manager.insert(User, user);
		return true;
	} catch (error) {
		return false;
	}
}

export function validateUser(userValidate: UserValidate, user: User): boolean {
	return bcrypt.compareSync(userValidate.password, user.password);
}

export function generateUserToken(user: User): string {
	const payload = new UserPayload(user.id, user.email);
	return jwt.sign(Object.assign(new Object, payload), jwtSecret, jwtOptions);
}

export function extractUserPayload(authorization: string): null | UserPayload {
	const [type, token] = authorization?.split(' ') ?? [];
	if ((type !== 'Bearer') || !token) {
		return null;
	}

	const jwtSecret = env.jwtSecret;
	let payload: UserPayload;
	jwt.verify(token, jwtSecret, (error, decoded) => {
		payload = (error ? null : Object(decoded));
	});

	return payload;
}