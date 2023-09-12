require('dotenv').config();
import express from 'express';
import database from './database';
import userRouter from './user/user-router';
import permissionRouter from './permission/permission-router';

const env = process.env;

database.initialize()
	.then(() => {})
	.catch(error => console.log(error));

const app = express();
app.use(
	express.json(),
	userRouter,
	permissionRouter,
);
app.listen(Number(env.appPort));
