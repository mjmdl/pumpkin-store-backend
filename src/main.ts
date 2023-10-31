import envVar from "./utils/env";
import dataSource from "data-source";
import express from "express";
import userRouter from "routers/user-router";

(async () => {
	await dataSource.initialize();

	const app = express();
	app.use(express.json());
	app.use(userRouter);

	const port = Number(envVar("EXPRESS_PORT"));
	console.log(`Listening to port ${port}.`);
	app.listen(port);
})();
