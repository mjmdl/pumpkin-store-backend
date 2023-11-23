import {DataSource} from "typeorm";

import {getEnv} from "./utils/env";
import {Bundle} from "./bundles/bundles-entities";
import {Category} from "./categories/categories-entities";
import {Product, ProductImage} from "./products/products-entities";
import {Purchase} from "./purchases/purchases-entities";
import {Role} from "./roles/roles-entities";
import {User, UserProfile} from "./users/users-entities";

export const dataSource = new DataSource({
	type: "postgres",
	host: getEnv("PG_HOST", "localhost"),
	port: Number(getEnv("PG_PORT", "5432")),
	username: getEnv("PG_USER", "postgres"),
	password: getEnv("PG_PASSWORD", "postgres"),
	database: getEnv("PG_DB", "pumpkin_store"),
	synchronize: getEnv("ORM_SYNC", "false") === "true",
	entities: [Bundle, Category, Product, ProductImage, Purchase, Role, User, UserProfile],
});
