import * as bcrypt from "bcrypt";
import dataSource from "data-source";
import {UserTokenDto} from "dtos/user-dtos";
import User from "entities/user-entity";
import * as jwt from "jsonwebtoken";
import envVar from "utils/env";
import UserProfile from "views/user-profile-view";

const jwtSecret = envVar("JSONWEBTOKEN_SECRET");
const jwtExpiresIn = envVar("JSONWEBTOKEN_EXPIRES_IN");

const userRepository = dataSource.getRepository(User);
const userProfileRepository = dataSource.getRepository(UserProfile);

function hashPassword(password: string): string | null {
	const SALT_ROUNDS: number = 12;
	try {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS));
	} catch (error) {
		console.error(error);
		return null;
	}
}

export function verifyPassword(
	inputPassword: string,
	hashedPassword: string
): boolean {
	try {
		return bcrypt.compareSync(inputPassword, hashedPassword);
	} catch (error) {
		console.error(error);
		return false;
	}
}

export async function createUser(newUser: User): Promise<number> {
	newUser.password = hashPassword(newUser.password);
	if (!newUser.password) {
		return 0;
	}

	try {
		const userCreated = await userRepository.insert(newUser);
		return userCreated.identifiers[0].id;
	} catch (error) {
		console.error(error);
		return 0;
	}
}

export async function doesUserEmailExist(userEmail: string): Promise<boolean> {
	try {
		const userFound = userRepository.exist({where: {email: userEmail}});
		return userFound;
	} catch (error) {
		console.error(error);
		return false;
	}
}

export async function findUserByEmail(userEmail: string): Promise<User | null> {
	try {
		const userFound = await userRepository.findOneByOrFail({
			email: userEmail,
		});
		if (!userFound) {
			return null;
		}
		return userFound;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function findUserProfileByEmail(
	userEmail: string
): Promise<UserProfile | null> {
	try {
		const profileFound = userProfileRepository.findOneByOrFail({
			email: userEmail,
		});
		return profileFound;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export function createUserToken(userTokenDto: UserTokenDto): string {
	const token = jwt.sign(userTokenDto, jwtSecret, {expiresIn: jwtExpiresIn});
	return token;
}

export function extractUserToken(authorization: string): UserTokenDto | null {
	const [type, token] = authorization.split(" ") ?? [];
	if (type.toLowerCase() !== "bearer" || !token) {
		return null;
	}

	try {
		const userTokenDto = jwt.verify(token, jwtSecret);
		return userTokenDto as UserTokenDto;
	} catch (error) {
		console.error(error);
		return null;
	}
}
