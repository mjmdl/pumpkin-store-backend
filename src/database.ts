import {DataSource} from "typeorm";
import User from "./user/user";
import {Permission} from "./permission/permission-entity";

const env = process.env;

const database = new DataSource({
	type: 'postgres',
	host: env.dbHost,
	port: Number(env.dbPort),
	username: env.dbUser,
	password: env.dbPassword,
	database: env.dbName,
	synchronize: env.ormSync === 'true',
	entities: [User, Permission],
});
export default database;
