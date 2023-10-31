import Attribute from "entities/attribute-entity";
import Bundle from "entities/bundle-entity";
import Category from "entities/category-entity";
import Claim from "entities/claim-entity";
import Product from "entities/product-entity";
import Purchase from "entities/purchase.entity";
import Role from "entities/role-entity";
import Shopcart from "entities/shopcart-entity";
import User from "entities/user-entity";
import envVar from "./utils/env";
import {DataSource} from "typeorm";
import UserProfile from "views/user-profile-view";

const dataSource = new DataSource({
	type: "postgres",
	host: envVar("POSTGRES_HOST"),
	port: Number(envVar("POSTGRES_PORT")),
	username: envVar("POSTGRES_USER"),
	password: envVar("POSTGRES_PASSWORD"),
	database: envVar("POSTGRES_DATABASE"),
	synchronize: envVar("TYPEORM_SYNCHRONIZE_POSTGRES") === "true",
	entities: [
		User,
		UserProfile,
		Claim,
		Role,
		Product,
		Attribute,
		Category,
		Bundle,
		Shopcart,
		Purchase,
	],
});
export default dataSource;
