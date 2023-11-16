import express from "express";

import {getEnv} from "./utils/env";
import {dataSource} from "./database";
import {log} from "./utils/logger";
import {usersRouter} from "./users/users-router";
import {categoriesRouter} from "./categories/categories-router";
import {productsRouter} from "./products/products-router";
import {rolesRouter} from "./roles/roles-router";
import {purchasesRouter} from "./purchases/purchases-router";

const ApiPort = Number(getEnv("API_PORT", "3000"));

async function main() {
	dataSource
		.initialize()
		.catch(reason =>
			log.error(`Failed to connect to the database because '${reason}'.`)
		);

	const api = express();
	api.use(express.json());
	api.use(usersRouter);
	api.use(rolesRouter);
	api.use(categoriesRouter);
	api.use(productsRouter);
	api.use(purchasesRouter);

	log.info(`Listening to port ${ApiPort}.`);
	api.listen(ApiPort);
}
main();
