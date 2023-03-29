import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { ErrorDefiner } from "./utils/Handlers/ErrorDefiner";
import { HTTPCode } from "./utils/Definers/HTTP";
import { errorHandler } from "./utils/Handlers/ErrorHandler";
import userRoutes from "./Routes/UserRoutes";

export const MiddleWares = (app: Application) => {
	app.get("/", (req, res) => {
		res.send("api is ready for consumption");
	});
	app
		.use(express.json())
		.use(cors())
		.use("/user", userRoutes)
		.use("*", (req: Request, res: Response, next: NextFunction) => {
			new ErrorDefiner({
				message: `this router ${req.originalUrl} does not exists`,
				status: HTTPCode.NOT_FOUND,
				name: "Route Error",
				isSuccess: false,
			});
		})

		.use(errorHandler);
};
